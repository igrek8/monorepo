import { mkdirSync } from 'fs';
import { Client } from 'pg';
import type { Config } from '../core/Config.js';
import type { DefaultCommandOptions } from '../core/DefaultCommandOptions.js';

export type InstallOptions = DefaultCommandOptions;

const sql = `CREATE TABLE <table> (
  id VARCHAR(140) PRIMARY KEY,
  meta JSONB NULL CHECK (jsonb_typeof(meta) = 'object'),
  ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

export async function install(options: InstallOptions, config?: Config): Promise<void> {
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
    await manager.query(sql.replace('<table>', table));
    mkdirSync(options.dir, { recursive: true });
  } finally {
    await manager.end();
  }
}
