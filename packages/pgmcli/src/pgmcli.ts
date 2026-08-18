#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import { readJSONFileSync } from './core/readJSONFileSync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PackageMetadata {
  readonly name: string;
  readonly version: string;
  readonly description: string;
}

const { name, version, description } = readJSONFileSync<PackageMetadata>(path.join(__dirname, '../package.json'));

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
