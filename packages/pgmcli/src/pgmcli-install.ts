#!/usr/bin/env node

import { program } from 'commander';

import { install, type InstallOptions } from './actions/install';
import { attachDefaultOptions } from './core/attachDefaultOptions';
import { resolveConfigSync } from './core/resolveConfigSync';

const config = resolveConfigSync(process.argv);

attachDefaultOptions(program, config)
  .description('Creates migrations directory and table')
  .action((options: InstallOptions) => install(options, config))
  .parse();
