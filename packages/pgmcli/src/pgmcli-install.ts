#!/usr/bin/env node

import { program } from 'commander';

import { install, type InstallOptions } from './actions/install.js';
import { attachDefaultOptions } from './core/attachDefaultOptions.js';
import { resolveConfigSync } from './core/resolveConfigSync.js';

const config = resolveConfigSync(process.argv);

attachDefaultOptions(program, config)
  .description('Creates migrations directory and table')
  .action((options: InstallOptions) => install(options, config))
  .parse();
