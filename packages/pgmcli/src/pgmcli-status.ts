#!/usr/bin/env node

import { program } from 'commander';

import { status, type StatusOptions } from './actions/status.js';
import { attachDefaultOptions } from './core/attachDefaultOptions.js';
import { resolveConfigSync } from './core/resolveConfigSync.js';

const config = resolveConfigSync(process.argv);

attachDefaultOptions(program, config)
  .description('Shows migrations statuses')
  .action((options: StatusOptions) => status(options, config))
  .parse();
