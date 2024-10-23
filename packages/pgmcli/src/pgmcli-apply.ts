#!/usr/bin/env node

import { Option, program } from 'commander';

import { type ApplyOptions, apply } from './actions/apply';
import { attachDefaultOptions } from './core/attachDefaultOptions';
import { DEFAULT_LOG_LEVEL, DEFAULT_TAG } from './core/constants';
import { LogLevel } from './core/logging';
import { resolveConfigSync } from './core/resolveConfigSync';

const config = resolveConfigSync(process.argv);

const logLevel = new Option('--log-level <level>', 'log level')
  .choices(Object.keys(LogLevel))
  .default(config?.logLevel ?? DEFAULT_LOG_LEVEL);

attachDefaultOptions(program, config)
  .description('Applies migrations')
  .option('--until <migration>', 'apply until the specified migration (inclusive)')
  .option('--plan', 'show plan')
  .addOption(logLevel)
  .option('--meta <jsonb>', 'extra meta associated with apply')
  .option('--tag <name>', 'tag where apply block ends', config?.tag ?? DEFAULT_TAG)
  .action((options: ApplyOptions) => apply(options, config))
  .parse();
