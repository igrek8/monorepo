import type { Migration } from './Migration.js';

export function sort(a: Migration, b: Migration): number {
  return a.created_at === b.created_at ? a.id.localeCompare(b.id) : a.created_at - b.created_at;
}
