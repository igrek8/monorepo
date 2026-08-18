import { resolve } from 'path';
import { Client } from 'pg';
import { checkIntegrity } from '../core/checkIntegrity.js';
import type { Config } from '../core/Config.js';
import type { DefaultCommandOptions } from '../core/DefaultCommandOptions.js';
import { getAppliedMigrations } from '../core/getAppliedMigrations.js';
import { getMigrations } from '../core/getMigrations.js';
import { getConsoleLevel, toServerSeverity } from '../core/logging.js';
import type { QueryExecutor, LogLevel } from '../types.js';
import type { NoticeMessage } from 'pg-protocol/dist/messages';
import { readFile } from 'fs/promises';
import { parseParams } from '../core/parseParams.js';
import type { DynamicModule } from '../core/DynamicModule.js';

export interface RevertOptions extends DefaultCommandOptions {
  readonly plan?: boolean;
  readonly until: string;
  readonly meta?: string;
  readonly tag: string;
  readonly logLevel: LogLevel;
}

function createClient(options: RevertOptions, config?: Config): Client {
  return new Client({
    ...config?.client,
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.db,
  });
}

function onNotice({ severity, message }: NoticeMessage): void {
  const level = getConsoleLevel(severity);
  console[level](message);
}

export async function revert(options: RevertOptions, config?: Config): Promise<void> {
  const manager = createClient(options, config);
  manager.on('notice', onNotice);
  const table = manager.escapeIdentifier(options.table);
  const severity = toServerSeverity(options.logLevel);
  const migrations = getMigrations(resolve(options.dir));
  try {
    await manager.connect();
    for (const { id } of Array.from(migrations.values()).reverse()) {
      try {
        await manager.query('BEGIN');
        await manager.query(`SET client_min_messages TO ${severity}`);
        await manager.query(`LOCK TABLE ${table} IN ACCESS EXCLUSIVE MODE`);
        const applied = await getAppliedMigrations(manager, table);
        checkIntegrity(migrations, applied);
        if (!migrations.has(options.until)) {
          throw new Error(`Migration ${options.until} not found`);
        }
        if (!applied.has(options.until)) {
          await manager.query('ROLLBACK');
          return;
        }
        const filePath = resolve(options.dir, id);
        let params: Record<string, string | undefined> | undefined;
        let queryBody: string | undefined;
        let queryExecutor: QueryExecutor | undefined;
        if (id.endsWith('.sql')) {
          const content = await readFile(filePath, 'utf8');
          const [, down] = content.split(options.tag);
          params = parseParams(content);
          queryBody = down;
        } else {
          const { down, downParams } = (await import(filePath)) as DynamicModule;
          params = downParams;
          queryExecutor = down;
        }
        if (!applied.has(id) && params?.run !== 'always') {
          await manager.query('ROLLBACK');
          continue;
        }
        console.info(`revert: ${id}`);
        if (!options.plan) {
          let connection = manager;
          try {
            if (params?.transaction === 'false') {
              connection = createClient(options, config);
              connection.on('notice', onNotice);
              await connection.connect();
              await connection.query(`SET client_min_messages TO ${severity}`);
            }
            if (queryBody) {
              await connection.query(queryBody);
            } else if (queryExecutor) {
              await queryExecutor(connection);
            }
          } finally {
            if (connection !== manager) {
              await connection.end();
            }
          }
          await manager.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
        }
        await manager.query('COMMIT');
        if (id === options.until) {
          break;
        }
      } catch (e) {
        await manager.query('ROLLBACK');
        throw e;
      }
    }
  } finally {
    await manager.end();
  }
}
