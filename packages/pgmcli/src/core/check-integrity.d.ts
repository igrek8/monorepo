import { type Migration } from './migration.interface.js';
export interface CheckIntegrityOptions {
    applied: Map<string, Migration>;
    migrations: Map<string, Migration>;
}
export declare function checkIntegrity({ applied, migrations }: CheckIntegrityOptions): void;
//# sourceMappingURL=check-integrity.d.ts.map