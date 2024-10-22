import pg from 'pg';

import { resolve } from 'path';
import { Config } from '../core/config.interface.js';
import { DefaultCommandOptions } from '../core/default-command-options.interface.js';
import { getAppliedMigrations } from '../core/get-applied-migrations.js';
import { getMigrations } from '../core/get-migrations.js';

export type StatusOptions = DefaultCommandOptions;

export async function status(options: StatusOptions, config?: Config, console = global.console) {
  const client = new pg.Client({
    ...config?.client,
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.db,
  });
  const table = client.escapeIdentifier(options.table);
  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(`LOCK TABLE ${table} IN ACCESS EXCLUSIVE MODE`);
    const [migrations, applied] = await Promise.all([
      getMigrations(resolve(options.dir)),
      getAppliedMigrations(client, table),
    ]);
    migrations.forEach(({ id }) => {
      const status = applied.has(id) ? 'applied' : 'pending';
      const meta = applied.get(id)?.meta;
      let message = `${status}: ${id}`;
      if (meta) message += ` ${JSON.stringify(meta, null, 2)}`;
      console.info(message);
    });
  } finally {
    await client.query('ROLLBACK');
    await client.end();
  }
}
