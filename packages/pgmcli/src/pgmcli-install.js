#!/usr/bin/env node
import { program } from 'commander';
import { install } from './actions/install.js';
import { attachDefaultOptions } from './core/attach-default-options.js';
import { resolveConfig } from './core/resolve-config.js';
const config = await resolveConfig(process.argv);
attachDefaultOptions(program, config)
    .description('Creates migrations directory and table')
    .action((options) => install(options, config))
    .parse();
//# sourceMappingURL=pgmcli-install.js.map