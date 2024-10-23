#!/usr/bin/env node

import { program } from 'commander';

program
  .name('pgmcli')
  .version(process.env.npm_package_version ?? '0.0.0')
  .description('A command-line tool to manage Postgres migrations')
  .command('install', 'create migrations table')
  .command('uninstall', 'drop migrations table')
  .command('status', 'show status')
  .command('create', 'create migration')
  .command('apply', 'apply migrations')
  .command('revert', 'revert migrations')
  .action(() => program.help())
  .parse();
