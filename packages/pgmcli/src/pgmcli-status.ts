#!/usr/bin/env node

import { program } from 'commander';

import { status, type StatusOptions } from './actions/status';
import { attachDefaultOptions } from './core/attachDefaultOptions';
import { resolveConfigSync } from './core/resolveConfigSync';

const config = resolveConfigSync(process.argv);

attachDefaultOptions(program, config)
  .description('Shows migrations statuses')
  .action((options: StatusOptions) => status(options, config))
  .parse();
