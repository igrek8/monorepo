import type { QueryExecutor } from '../types.js';

export interface DynamicModule {
  readonly upParams?: Record<string, string | undefined>;
  readonly up?: QueryExecutor;
  readonly downParams?: Record<string, string | undefined>;
  readonly down?: QueryExecutor;
}
