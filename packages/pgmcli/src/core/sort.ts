import type { Migration } from './migration.interface.js';

export function sort(a: Migration, b: Migration) {
  return a.created_at === b.created_at ? a.id.localeCompare(b.id) : a.created_at - b.created_at;
}
