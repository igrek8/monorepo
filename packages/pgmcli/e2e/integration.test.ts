import type { PathLike } from 'fs';
import fs from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { Client } from 'pg';
import { PassThrough } from 'stream';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { apply } from '../src/actions/apply';
import { create } from '../src/actions/create';
import { install } from '../src/actions/install';
import { revert } from '../src/actions/revert';
import { status } from '../src/actions/status';
import { uninstall } from '../src/actions/uninstall';
import type { Config } from '../src/core/config.interface';
import { DEFAULT_HOST, DEFAULT_PORT, DEFAULT_TAG } from '../src/core/constants';
import type { DefaultCommandOptions } from '../src/core/default-command-options.interface';
import { LogLevel } from '../src/core/logging';

async function getFileContent(path: PathLike) {
  return (await fs.readFile(path, 'utf-8')).trim();
}

const stdout = new PassThrough();
const stderr = new PassThrough();
const logger = new console.Console(stdout, stderr);
const info = vi.spyOn(logger, 'info');

const options: DefaultCommandOptions = {
  host: process.env.POSTGRES_HOST ?? DEFAULT_HOST,
  port: Number(process.env.POSTGRES_PORT ?? DEFAULT_PORT),
  user: 'postgres',
  table: 'migrations',
  dir: path.join(__dirname, '..', 'migrations'),
};

const config: Config = {
  client: {
    ssl: false,
  },
};

const tables = ['payment', 'order_item', 'order', 'book', 'customer', 'migrations'];

async function listTables(db: Client): Promise<string[]> {
  const { rows } = await db.query(
    `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = $1
    ORDER BY table_name ASC
  `,
    ['public'],
  );
  return rows.map((row) => row.table_name);
}

describe.sequential('pgmcli', () => {
  let db: Client;

  beforeAll(async () => {
    db = new Client({
      host: options.host,
      port: options.port,
      user: options.user,
      database: options.db,
    });
    await db.connect();
    await Promise.all(tables.map((table) => db.query(`DROP TABLE IF EXISTS "${table}"`)));
  });

  afterAll(async () => {
    await db.end();
  });

  describe('install', () => {
    it('creates migrations table', async () => {
      await install(options);
      await expect(listTables(db)).resolves.toStrictEqual(['migrations']);
    });
  });

  describe('status', () => {
    it('shows the status of the migrations', async () => {
      await status(options, config, logger);
      expect(info).toHaveBeenNthCalledWith(1, 'pending: 1_add_customer_table.sql');
      expect(info).toHaveBeenNthCalledWith(2, 'pending: 2_add_book_table.sql');
      expect(info).toHaveBeenNthCalledWith(3, 'pending: 3_add_order_table.js');
      expect(info).toHaveBeenNthCalledWith(4, 'pending: 4_add_order_item_table.sql');
      expect(info).toHaveBeenNthCalledWith(5, 'pending: 5_add_payment_table.sql');
    });
  });

  describe('apply', () => {
    it('applies the first 3 migrations', async () => {
      info.mockReset();
      await apply(
        {
          ...options,
          until: '3_add_order_table.js',
          tag: DEFAULT_TAG,
          logLevel: LogLevel.INFO,
        },
        config,
        logger,
      );
      await expect(listTables(db)).resolves.toStrictEqual(['book', 'customer', 'migrations', 'order']);
      expect(info).toHaveBeenCalledWith('Creating table book');
    });

    it('skips if until migration is already applied', async () => {
      info.mockReset();
      await apply(
        {
          ...options,
          tag: DEFAULT_TAG,
          until: '3_add_order_table.js',
          logLevel: LogLevel.INFO,
        },
        config,
        logger,
      );
      await expect(listTables(db)).resolves.toStrictEqual(['book', 'customer', 'migrations', 'order']);
      expect(info).not.toHaveBeenCalled();
    });

    it('throws if until migration is not found', async () => {
      await expect(
        apply(
          {
            ...options,
            until: '6_add_payment_term_table.sql',
            tag: DEFAULT_TAG,
            logLevel: LogLevel.INFO,
          },
          config,
          logger,
        ),
      ).rejects.toThrow('Migration 6_add_payment_term_table.sql not found');
    });

    it('shows the status of the migrations', async () => {
      info.mockReset();
      await status(options, config, logger);
      expect(info).toHaveBeenNthCalledWith(1, 'applied: 1_add_customer_table.sql');
      expect(info).toHaveBeenNthCalledWith(2, 'applied: 2_add_book_table.sql');
      expect(info).toHaveBeenNthCalledWith(3, 'applied: 3_add_order_table.js');
      expect(info).toHaveBeenNthCalledWith(4, 'pending: 4_add_order_item_table.sql');
      expect(info).toHaveBeenNthCalledWith(5, 'pending: 5_add_payment_table.sql');
    });

    it('applies the next 2 migrations', async () => {
      await apply(
        {
          ...options,
          tag: DEFAULT_TAG,
          logLevel: LogLevel.INFO,
          meta: '{ "test": true }',
        },
        config,
        logger,
      );
      await expect(listTables(db)).resolves.toStrictEqual([
        'book',
        'customer',
        'migrations',
        'order',
        'order_item',
        'payment',
      ]);
    });

    it('shows the status of the migrations', async () => {
      info.mockReset();
      await status(options, config, logger);
      expect(info).toHaveBeenNthCalledWith(1, 'applied: 1_add_customer_table.sql');
      expect(info).toHaveBeenNthCalledWith(2, 'applied: 2_add_book_table.sql');
      expect(info).toHaveBeenNthCalledWith(3, 'applied: 3_add_order_table.js');
      expect(info).toHaveBeenNthCalledWith(4, 'applied: 4_add_order_item_table.sql {\n  "test": true\n}');
      expect(info).toHaveBeenNthCalledWith(5, 'applied: 5_add_payment_table.sql {\n  "test": true\n}');
    });
  });

  describe('revert', () => {
    it('reverts the last 2 migrations', async () => {
      await revert(
        {
          ...options,
          until: '4_add_order_item_table.sql',
          tag: DEFAULT_TAG,
          logLevel: LogLevel.INFO,
        },
        config,
        logger,
      );
      await expect(listTables(db)).resolves.toStrictEqual(['book', 'customer', 'migrations', 'order']);
    });

    it('skips if until migration is already reverted', async () => {
      info.mockReset();
      await revert(
        {
          ...options,
          until: '4_add_order_item_table.sql',
          tag: DEFAULT_TAG,
          logLevel: LogLevel.INFO,
        },
        config,
        logger,
      );
      await expect(listTables(db)).resolves.toStrictEqual(['book', 'customer', 'migrations', 'order']);
      expect(info).not.toHaveBeenCalled();
    });

    it('throws if until migration is not found', async () => {
      await expect(
        revert(
          {
            ...options,
            until: '6_add_payment_term_table.sql',
            tag: DEFAULT_TAG,
            logLevel: LogLevel.INFO,
          },
          config,
          logger,
        ),
      ).rejects.toThrow('Migration 6_add_payment_term_table.sql not found');
    });

    it('shows the status of the migrations', async () => {
      info.mockReset();
      await status(options, config, logger);
      expect(info).toHaveBeenNthCalledWith(1, 'applied: 1_add_customer_table.sql');
      expect(info).toHaveBeenNthCalledWith(2, 'applied: 2_add_book_table.sql');
      expect(info).toHaveBeenNthCalledWith(3, 'applied: 3_add_order_table.js');
      expect(info).toHaveBeenNthCalledWith(4, 'pending: 4_add_order_item_table.sql');
      expect(info).toHaveBeenNthCalledWith(5, 'pending: 5_add_payment_table.sql');
    });

    it('reverts the last 3 migrations', async () => {
      info.mockReset();
      await revert(
        {
          ...options,
          until: '1_add_customer_table.sql',
          tag: DEFAULT_TAG,
          logLevel: LogLevel.INFO,
        },
        config,
        logger,
      );
      await expect(listTables(db)).resolves.toStrictEqual(['migrations']);
      expect(info).toHaveBeenCalledWith('Dropping table book');
    });

    it('shows the status of the migrations', async () => {
      info.mockReset();
      await status(options, config, logger);
      expect(info).toHaveBeenNthCalledWith(1, 'pending: 1_add_customer_table.sql');
      expect(info).toHaveBeenNthCalledWith(2, 'pending: 2_add_book_table.sql');
      expect(info).toHaveBeenNthCalledWith(3, 'pending: 3_add_order_table.js');
      expect(info).toHaveBeenNthCalledWith(4, 'pending: 4_add_order_item_table.sql');
      expect(info).toHaveBeenNthCalledWith(5, 'pending: 5_add_payment_table.sql');
    });
  });

  describe('uninstall', () => {
    it('removes the migrations table', async () => {
      await uninstall(options, config);
      await expect(listTables(db)).resolves.toStrictEqual([]);
    });
  });

  describe('create', () => {
    it('creates a new migration file', async () => {
      const outDir = tmpdir();
      const outFile = path.join(outDir, '1704067200000_add_new_table.sql');
      vi.setSystemTime('2024-01-01T00:00:00Z');
      await create({ dir: outDir, name: 'add_new_table.sql', tag: DEFAULT_TAG }, logger);
      await expect(getFileContent(outFile)).resolves.toMatchSnapshot();
    });
  });
});
