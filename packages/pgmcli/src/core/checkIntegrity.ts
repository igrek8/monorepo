import { strict as assert } from 'assert/strict';

import type { Migration } from './Migration';

export function checkIntegrity(migrations: Map<string, Migration>, applied: Map<string, Migration>) {
  const items = Array.from(migrations.values());
  Array.from(applied.values()).forEach(({ id }, index) => {
    const migration = items.at(index);
    assert(migration, `can't find migration ${id}`);
    assert(migration.id === id, `out of sync migrations`);
  });
}
