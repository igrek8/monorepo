import { test, expect, describe } from 'vitest';
import { sort } from './sort.js';
describe('sort', () => {
    test('sort with id', () => {
        const m1 = { id: 'a', created_at: 1 };
        const m2 = { id: 'b', created_at: 1 };
        const m3 = { id: 'c', created_at: 1 };
        expect([m3, m2, m1].sort(sort)).toEqual([m1, m2, m3]);
    });
    test('sort with timestamp', () => {
        const m1 = { id: 'a', created_at: 1 };
        const m2 = { id: 'a', created_at: 2 };
        const m3 = { id: 'a', created_at: 3 };
        expect([m3, m2, m1].sort(sort)).toEqual([m1, m2, m3]);
    });
});
//# sourceMappingURL=sort.test.js.map