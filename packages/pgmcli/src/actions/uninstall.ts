import pg from 'pg';

import type { Config } from '../core/config.interface.js';
import { DefaultCommandOptions } from '../core/default-command-options.interface.js';

export type UninstallOptions = DefaultCommandOptions;

export async function uninstall(options: UninstallOptions, config?: Config) {
  const client = new pg.Client({
    ...config?.client,
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.db,
  });
  try {
    await client.connect();
    const table = client.escapeIdentifier(options.table);
    await client.query(`DROP TABLE ${table}`);
  } finally {
    await client.end();
  }
}
