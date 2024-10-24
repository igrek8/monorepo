#!/usr/bin/env node

import { program } from 'commander';

import { create, templates, type CreateOptions } from './actions/create';
import { DEFAULT_DIR, DEFAULT_TAG } from './core/constants';
import { resolveConfigSync } from './core/resolveConfigSync';

const extensions = Object.keys(templates).join(', ');

const config = resolveConfigSync(process.argv);

program
  .description('Creates a migration file')
  .requiredOption('--name <name>', `migration file name (${extensions})`)
  .option('--plan', 'show plan')
  .requiredOption('--dir <name>', 'migrations directory', config?.dir ?? DEFAULT_DIR)
  .requiredOption('--tag <name>', 'tag where revert block begins', config?.tag ?? DEFAULT_TAG)
  .option('--config <path>', 'config path')
  .action((options: CreateOptions) => create(options))
  .parse();
