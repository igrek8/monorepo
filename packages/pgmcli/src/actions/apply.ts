import { readFile } from 'fs/promises';
import { resolve } from 'path';
import pg from 'pg';

import { checkIntegrity } from '../core/check-integrity.js';
import { Config } from '../core/config.interface.js';
import { DefaultCommandOptions } from '../core/default-command-options.interface.js';
import { getAppliedMigrations } from '../core/get-applied-migrations.js';
import { getMigrations } from '../core/get-migrations.js';
import { LogLevel, getConsoleLevel, toServerSeverity } from '../core/logging.js';

export interface ApplyOptions extends DefaultCommandOptions {
  plan?: boolean;
  until?: string;
  meta?: string;
  tag: string;
  logLevel: LogLevel;
}

export async function apply(options: ApplyOptions, config?: Config, console = global.console) {
  const db = new pg.Client({
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
    const [migrations, applied] = await Promise.all([
      getMigrations(resolve(options.dir)),
      getAppliedMigrations(db, table),
    ]);
    checkIntegrity({ applied, migrations });
    if (options.until) {
      if (!migrations.has(options.until)) {
        throw new Error(`Migration ${options.until} not found`);
      }
      if (applied.has(options.until)) {
        return;
      }
    }
    for (const migration of migrations.values()) {
      if (applied.has(migration.id)) {
        continue;
      }
      console.info(`apply: ${migration.id}`);
      if (!options.plan) {
        const filePath = resolve(options.dir, migration.id);
        if (migration.id.endsWith('.sql')) {
          const content = await readFile(filePath, { encoding: 'utf-8' });
          const [up] = content.split(options.tag);
          if (up) {
            await db.query(up);
          }
        } else {
          const mod = await import(filePath);
          await (mod.up ?? mod.default.up)?.(db, { logLevel: options.logLevel });
        }
        const row = [migration.id, options.meta];
        await db.query(`INSERT INTO ${table} VALUES ($1, $2)`, row);
      }
      if (migration.id === options.until) {
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
