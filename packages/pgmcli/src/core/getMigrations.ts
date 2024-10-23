import { strict as assert } from 'assert/strict';
import { readdirSync } from 'fs';
import type { Migration } from './Migration';
import { sort } from './sort';

export function getMigrations(migrationsDir: string) {
  return new Map<string, Migration>(
    readdirSync(migrationsDir, { withFileTypes: true })
      .reduce<[string, Migration][]>((arr, entry) => {
        if (entry.isFile()) {
          const created_at = Number.parseInt(entry.name);
          assert(Number.isFinite(created_at), `Migration name ${entry.name} must have a timestamp`);
          arr.push([entry.name, { id: entry.name, created_at }]);
        }
        return arr;
      }, [])
      .sort(([, a], [, b]) => sort(a, b)),
  );
}
