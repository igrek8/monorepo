import assert from 'assert/strict';
export function checkIntegrity({ applied, migrations }) {
    const items = Array.from(migrations.values());
    Array.from(applied.values()).forEach(({ id }, index) => {
        const migration = items.at(index);
        assert(migration, `can't find migration ${id}`);
        assert(migration.id === id, `out of sync migrations`);
    });
}
//# sourceMappingURL=check-integrity.js.map