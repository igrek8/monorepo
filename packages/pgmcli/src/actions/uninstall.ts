import { Client } from 'pg';
import type { Config } from '../core/Config.js';
import type { DefaultCommandOptions } from '../core/DefaultCommandOptions.js';

export type UninstallOptions = DefaultCommandOptions;

export async function uninstall(options: UninstallOptions, config?: Config): Promise<void> {
  const client = new Client({
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
    await client.query(`DROP TABLE ${table}`);
  } finally {
    await client.end();
  }
}
