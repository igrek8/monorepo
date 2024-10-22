import { checkFileExists } from './check-file-exists.js';
import { DEFAULT_CONFIG_PATH } from './constants.js';
import { getConfigPath } from './get-config-path.js';
import { readConfig } from './read-config.js';
export async function resolveConfig(argv) {
    const configPath = getConfigPath(argv) ?? DEFAULT_CONFIG_PATH;
    if (await checkFileExists(configPath))
        return readConfig(configPath);
    return undefined;
}
//# sourceMappingURL=resolve-config.js.map