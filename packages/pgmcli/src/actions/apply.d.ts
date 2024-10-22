import { Config } from '../core/config.interface.js';
import { DefaultCommandOptions } from '../core/default-command-options.interface.js';
import { LogLevel } from '../core/logging.js';
export interface ApplyOptions extends DefaultCommandOptions {
    plan?: boolean;
    until?: string;
    meta?: string;
    tag: string;
    logLevel: LogLevel;
}
export declare function apply(options: ApplyOptions, config?: Config, console?: Console): Promise<void>;
//# sourceMappingURL=apply.d.ts.map