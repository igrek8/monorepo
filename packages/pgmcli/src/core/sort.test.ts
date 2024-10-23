import { describe, expect, it } from 'vitest';
import type { Migration } from './migration.interface.js';
import { sort } from './sort.js';

describe('sort', () => {
  it('sorts by id', () => {
    const m1: Migration = { id: 'a', created_at: 1 };
    const m2: Migration = { id: 'b', created_at: 1 };
    const m3: Migration = { id: 'c', created_at: 1 };
    expect([m3, m2, m1].sort(sort)).toStrictEqual([m1, m2, m3]);
  });

  it('sorts by timestamp', () => {
    const m1: Migration = { id: 'a', created_at: 1 };
    const m2: Migration = { id: 'a', created_at: 2 };
    const m3: Migration = { id: 'a', created_at: 3 };
    expect([m3, m2, m1].sort(sort)).toStrictEqual([m1, m2, m3]);
  });
});
