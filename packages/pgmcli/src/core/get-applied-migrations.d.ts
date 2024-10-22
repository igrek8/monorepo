import pg from 'pg';
import type { Migration } from './migration.interface.js';
export declare function getAppliedMigrations(client: pg.Client, table: string): Promise<Map<string, Migration>>;
//# sourceMappingURL=get-applied-migrations.d.ts.map