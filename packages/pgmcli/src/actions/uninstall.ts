import { Client } from 'pg';
import type { Config } from '../core/Config.js';
import type { DefaultCommandOptions } from '../core/DefaultCommandOptions.js';

export type UninstallOptions = DefaultCommandOptions;

export async function uninstall(options: UninstallOptions, config?: Config): Promise<void> {
  const manager = new Client({
    ...config?.client,
    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    database: options.db,
  });
  const table = manager.escapeIdentifier(options.table);
  try {
    await manager.connect();
    await manager.query(`DROP TABLE ${table}`);
  } finally {
    await manager.end();
  }
}
