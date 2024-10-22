import { DEFAULT_CONFIG_PATH, DEFAULT_DIR, DEFAULT_TABLE } from './constants.js';
export function attachDefaultOptions(cmd, config) {
    return cmd
        .option('--host <string>', 'host', config?.host ?? process.env.POSTGRES_HOST)
        .option('--port <number>', 'port', Number, config?.port ?? process.env.POSTGRES_PORT)
        .option('-u, --user <string>', 'user', config?.user ?? process.env.POSTGRES_USER)
        .option('-p, --password <string>', 'password', config?.password ?? process.env.POSTGRES_PASSWORD)
        .option('--db <name>', 'database', config?.db ?? process.env.POSTGRES_DB)
        .requiredOption('--dir <name>', 'migrations directory', config?.dir ?? DEFAULT_DIR)
        .requiredOption('--table <name>', 'migrations table', config?.table ?? DEFAULT_TABLE)
        .requiredOption('--config <path>', 'config path', DEFAULT_CONFIG_PATH);
}
//# sourceMappingURL=attach-default-options.js.map