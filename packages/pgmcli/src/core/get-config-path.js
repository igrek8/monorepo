export function getConfigPath(argv) {
    try {
        for (let i = 0; i < argv.length; ++i) {
            const arg = argv[i];
            if (arg === '--config') {
                return argv.at(i + 1);
            }
        }
    }
    catch {
        // Ignore
    }
    return undefined;
}
//# sourceMappingURL=get-config-path.js.map