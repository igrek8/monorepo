#!/usr/bin/env node

import { Option, program } from 'commander';

import { revert, type RevertOptions } from './actions/revert';
import { attachDefaultOptions } from './core/attachDefaultOptions';
import { DEFAULT_LOG_LEVEL, DEFAULT_TAG } from './core/constants';
import { LogLevel } from './core/logging';
import { resolveConfigSync } from './core/resolveConfigSync';

const config = resolveConfigSync(process.argv);

const logLevel = new Option('--log-level <level>', 'log level')
  .choices(Object.keys(LogLevel))
  .default(config?.logLevel ?? DEFAULT_LOG_LEVEL);

attachDefaultOptions(program, config)
  .description('Reverts migrations')
  .requiredOption('--until <migration>', 'revert until the specified migration (inclusive)')
  .option('--plan', 'show plan')
  .addOption(logLevel)
  .option('--tag <name>', 'tag where revert block begins', config?.tag ?? DEFAULT_TAG)
  .action((options: RevertOptions) => revert(options, config))
  .parse();
