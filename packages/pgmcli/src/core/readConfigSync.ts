import type { PathLike } from 'fs';
import type { Config } from './Config';
import { isConfig } from './isConfig';
import { readJSONFileSync } from './readJSONFileSync';

export function readConfigSync(configPath: PathLike): Config {
  const config = readJSONFileSync(configPath);
  if (isConfig(config)) return config;
  throw new Error(`Invalid config ${configPath}`);
}
