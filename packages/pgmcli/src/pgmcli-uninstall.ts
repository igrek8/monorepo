#!/usr/bin/env node

import { program } from 'commander';

import { uninstall, type UninstallOptions } from './actions/uninstall';
import { attachDefaultOptions } from './core/attachDefaultOptions';
import { resolveConfigSync } from './core/resolveConfigSync';

const config = resolveConfigSync(process.argv);

attachDefaultOptions(program, config)
  .description('Drops migrations table')
  .action((options: UninstallOptions) => uninstall(options, config))
  .parse();
