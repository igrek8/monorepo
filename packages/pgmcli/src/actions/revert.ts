import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Client } from 'pg';
import { checkIntegrity } from '../core/checkIntegrity';
import type { Config } from '../core/Config';
import type { DefaultCommandOptions } from '../core/DefaultCommandOptions';
import { getAppliedMigrations } from '../core/getAppliedMigrations';
import { getMigrations } from '../core/getMigrations';
import { LogLevel, getConsoleLevel, toServerSeverity } from '../core/logging';

export interface RevertOptions extends DefaultCommandOptions {
  plan?: boolean;
  until: string;
  meta?: string;
  tag: string;
  logLevel: LogLevel;
}

export async function revert(options: RevertOptions, config?: Config, console = globalThis.console) {
  const db = new Client({
    ...config?.client,
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.db,
  });
  db.on('notice', ({ severity, message }) => {
    const level = getConsoleLevel(severity);
    console[level](message);
  });
  const table = db.escapeIdentifier(options.table);
  const severity = toServerSeverity(options.logLevel);
  try {
    await db.connect();
    await db.query('BEGIN');
    await db.query(`SET client_min_messages TO ${severity}`);
    await db.query(`LOCK TABLE ${table} IN ACCESS EXCLUSIVE MODE`);
    const migrations = getMigrations(resolve(options.dir));
    const applied = await getAppliedMigrations(db, table);
    checkIntegrity(migrations, applied);
    if (!migrations.has(options.until)) {
      throw new Error(`Migration ${options.until} not found`);
    }
    if (!applied.has(options.until)) {
      return;
    }
    for (const migration of Array.from(migrations.values()).reverse()) {
      if (!applied.has(migration.id)) {
        continue;
      }
      console.info(`revert: ${migration.id}`);
      if (!options.plan) {
        const filePath = resolve(options.dir, migration.id);
        if (migration.id.endsWith('.sql')) {
          const content = readFileSync(filePath, { encoding: 'utf-8' });
          const [, down] = content.split(options.tag);
          if (down) {
            await db.query(down);
          }
        } else {
          const module = await import(filePath);
          await (module.down ?? module.default.down)?.(db, { logLevel: options.logLevel });
        }
        await db.query(`DELETE FROM ${table} WHERE id = $1`, [migration.id]);
      }
      if (options.until === migration.id) {
        break;
      }
    }
    await db.query('COMMIT');
  } catch (e) {
    await db.query('ROLLBACK');
    throw e;
  } finally {
    await db.end();
  }
}
