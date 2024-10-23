import { ajv } from './ajv.js';
import type { Config } from './config.interface.js';

export function isConfig(config: unknown): config is Config {
  return ajv.validate('#', config);
}
