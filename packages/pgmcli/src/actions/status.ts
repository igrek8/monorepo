import { resolve } from 'path';
import { Client } from 'pg';
import type { Config } from '../core/Config.js';
import type { DefaultCommandOptions } from '../core/DefaultCommandOptions.js';
import { getAppliedMigrations } from '../core/getAppliedMigrations.js';
import { getMigrations } from '../core/getMigrations.js';

export type StatusOptions = DefaultCommandOptions;

export async function status(options: StatusOptions, config?: Config): Promise<void> {
  const manager = new Client({
    ...config?.client,
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.db,
  });
  const table = manager.escapeIdentifier(options.table);
  const migrations = getMigrations(resolve(options.dir));
  try {
    await manager.connect();
    try {
      await manager.query('BEGIN');
      await manager.query(`LOCK TABLE ${table} IN ACCESS EXCLUSIVE MODE`);
      const applied = await getAppliedMigrations(manager, table);
      migrations.forEach(({ id }) => {
        const status = applied.has(id) ? 'applied' : 'pending';
        const meta = applied.get(id)?.meta;
        let message = `${status}: ${id}`;
        if (meta) message += ` ${JSON.stringify(meta, null, 2)}`;
        console.info(message);
      });
    } finally {
      await manager.query('ROLLBACK');
    }
  } finally {
    await manager.end();
  }
}
