import { isValidConfig } from './is-valid-config.js';
import { readJSONFile } from './read-json-file.js';
export async function readConfig(configPath) {
    const config = await readJSONFile(configPath);
    if (isValidConfig(config))
        return config;
    throw new Error(`Invalid config ${configPath}`);
}
//# sourceMappingURL=read-config.js.map