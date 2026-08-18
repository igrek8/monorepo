import { ajv } from './ajv.js';
import type { Config } from './Config.js';

export function isConfig(config: unknown): config is Config {
  return ajv.validate('#', config);
}
