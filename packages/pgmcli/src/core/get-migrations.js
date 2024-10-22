import assert from 'assert/strict';
import { readdir } from 'fs/promises';
import { sort } from './sort.js';
export async function getMigrations(migrationsDir) {
    return new Map((await readdir(migrationsDir, { withFileTypes: true }))
        .reduce((arr, entry) => {
        if (entry.isFile()) {
            const created_at = Number.parseInt(entry.name);
            assert(Number.isFinite(created_at), `Migration name ${entry.name} must have a timestamp`);
            arr.push([entry.name, { id: entry.name, created_at }]);
        }
        return arr;
    }, [])
        .sort(([, a], [, b]) => sort(a, b)));
}
//# sourceMappingURL=get-migrations.js.map