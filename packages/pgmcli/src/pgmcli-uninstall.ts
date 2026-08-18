#!/usr/bin/env node

import { program } from 'commander';

import { uninstall, type UninstallOptions } from './actions/uninstall.js';
import { attachDefaultOptions } from './core/attachDefaultOptions.js';
import { resolveConfigSync } from './core/resolveConfigSync.js';

const config = resolveConfigSync(process.argv);

attachDefaultOptions(program, config)
  .description('Drops migrations table')
  .action((options: UninstallOptions) => uninstall(options, config))
  .parse();
