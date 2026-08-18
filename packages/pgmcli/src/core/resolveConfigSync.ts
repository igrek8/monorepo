import { existsSync } from 'fs';
import type { Config } from './Config.js';
import { DEFAULT_CONFIG_PATH } from './constants.js';
import { getConfigPath } from './getConfigPath.js';
import { readConfigSync } from './readConfigSync.js';

export function resolveConfigSync(argv: string[]): Config | undefined {
  const configPath = getConfigPath(argv) ?? DEFAULT_CONFIG_PATH;
  if (existsSync(configPath)) return readConfigSync(configPath);
  return undefined;
}
