import type { PathLike } from 'fs';
import type { Config } from './config.interface.js';
import { isConfig } from './is-config.js';
import { readJSONFile } from './read-json-file.js';

export async function readConfig(configPath: PathLike): Promise<Config> {
  const config = await readJSONFile(configPath);
  if (isConfig(config)) return config;
  throw new Error(`Invalid config ${configPath}`);
}
