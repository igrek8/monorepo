import type { PathLike } from 'fs';
import type { Config } from './Config.js';
import { isConfig } from './isConfig.js';
import { readJSONFileSync } from './readJSONFileSync.js';

export function readConfigSync(configPath: PathLike): Config {
  const config = readJSONFileSync(configPath);
  if (isConfig(config)) return config;
  throw new Error(`Invalid config ${configPath.toString()}`);
}
