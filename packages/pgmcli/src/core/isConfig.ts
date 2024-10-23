import { ajv } from './ajv';
import type { Config } from './Config';

export function isConfig(config: unknown): config is Config {
  return ajv.validate('#', config);
}
