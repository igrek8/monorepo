import type { UpFunction, DownFunction } from '../types.js';

export interface DynamicModule {
  readonly upParams?: Record<string, string | undefined>;
  readonly up?: UpFunction;
  readonly downParams?: Record<string, string | undefined>;
  readonly down?: DownFunction;
}
