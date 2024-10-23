import { strict as assert } from 'assert/strict';
import type { Client } from 'pg';
import type { Migration } from './Migration';
import { sort } from './sort';

export async function getAppliedMigrations(client: Client, table: string) {
  return new Map<string, Migration>(
    (await client.query<Migration>(`SELECT * FROM ${table}`)).rows
      .map<[string, Migration]>(({ id, meta }) => {
        const created_at = Number.parseInt(id);
        assert(Number.isFinite(created_at), `Malformed migration name ${id}`);
        return [id, { id, created_at, meta }];
      })
      .sort(([, a], [, b]) => sort(a, b)),
  );
}
