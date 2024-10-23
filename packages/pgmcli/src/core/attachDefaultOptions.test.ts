import { Command } from 'commander';
import { describe, expect, it } from 'vitest';
import { attachDefaultOptions } from './attachDefaultOptions';
import type { Config } from './Config';

describe('attachDefaultOptions', () => {
  it('uses default options', () => {
    const cmd = new Command();
    attachDefaultOptions(cmd);
    expect(cmd.opts()).toStrictEqual({ dir: 'migrations', table: 'migrations', config: '.pgmcli' });
  });

  it('uses config', () => {
    const cmd = new Command();
    const config: Config = { dir: 'mydir', table: 'mytable' };
    attachDefaultOptions(cmd, config);
    expect(cmd.opts()).toStrictEqual({ ...config, config: '.pgmcli' });
  });
});
