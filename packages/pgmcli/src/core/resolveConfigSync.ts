import { existsSync } from 'fs';
import type { Config } from './Config';
import { DEFAULT_CONFIG_PATH } from './constants';
import { getConfigPath } from './getConfigPath';
import { readConfigSync } from './readConfigSync';

export function resolveConfigSync(argv: string[]): Config | undefined {
  const configPath = getConfigPath(argv) ?? DEFAULT_CONFIG_PATH;
  if (existsSync(configPath)) return readConfigSync(configPath);
  return undefined;
}
