#!/usr/bin/env node

import { program } from 'commander';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { name, version, description } = require(path.join(__dirname, '..', 'package.json'));

program
  .name(name)
  .version(version)
  .description(description)
  .command('install', 'create migrations table')
  .command('uninstall', 'drop migrations table')
  .command('status', 'show status')
  .command('create', 'create migration')
  .command('apply', 'apply migrations')
  .command('revert', 'revert migrations')
  .action(() => program.help())
  .parse();
