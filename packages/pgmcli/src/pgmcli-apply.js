#!/usr/bin/env node
import { Option, program } from 'commander';
import { apply } from './actions/apply.js';
import { attachDefaultOptions } from './core/attach-default-options.js';
import { DEFAULT_LOG_LEVEL, DEFAULT_TAG } from './core/constants.js';
import { LogLevel } from './core/logging.js';
import { resolveConfig } from './core/resolve-config.js';
const config = await resolveConfig(process.argv);
const logLevel = new Option('--log-level <level>', 'log level')
    .choices(Object.keys(LogLevel))
    .default(config?.logLevel ?? DEFAULT_LOG_LEVEL);
attachDefaultOptions(program, config)
    .description('Applies migrations')
    .option('--until <migration>', 'apply until the specified migration (inclusive)')
    .option('--plan', 'show plan')
    .addOption(logLevel)
    .option('--meta <jsonb>', 'extra meta associated with apply')
    .option('--tag <name>', 'tag where apply block ends', config?.tag ?? DEFAULT_TAG)
    .action((options) => apply(options, config))
    .parse();
//# sourceMappingURL=pgmcli-apply.js.map