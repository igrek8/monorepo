import assert from 'assert/strict';
import { sort } from './sort.js';
export async function getAppliedMigrations(client, table) {
    return new Map((await client.query(`SELECT * FROM ${table}`)).rows
        .map(({ id, meta }) => {
        const created_at = Number.parseInt(id);
        assert(Number.isFinite(created_at), `Malformed migration name ${id}`);
        return [id, { id, created_at, meta }];
    })
        .sort(([, a], [, b]) => sort(a, b)));
}
//# sourceMappingURL=get-applied-migrations.js.map