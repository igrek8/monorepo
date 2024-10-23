import { mkdir } from 'fs/promises';
import pg from 'pg';

import type { Config } from '../core/config.interface.js';
import type { DefaultCommandOptions } from '../core/default-command-options.interface.js';

export type InstallOptions = DefaultCommandOptions;

const sql = `CREATE TABLE <table> (
  id VARCHAR(140) PRIMARY KEY,
  meta JSONB NULL CHECK (jsonb_typeof(meta) = 'object'),
  ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

export async function install(options: InstallOptions, config?: Config) {
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
    await client.query(sql.replace('<table>', table));
    await mkdir(options.dir, { recursive: true });
  } finally {
    await client.end();
  }
}
