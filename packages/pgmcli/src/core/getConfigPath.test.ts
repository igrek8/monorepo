import { describe, expect, it } from 'vitest';
import { getConfigPath } from './getConfigPath';

describe('getConfigPath', () => {
  it('returns the path to the config file', () => {
    expect(getConfigPath(['node', 'dist/pgmcli.js', '--config', 'config.json'])).toBe('config.json');
  });

  it('returns undefined', () => {
    expect(getConfigPath(['node', 'dist/pgmcli.js'])).toBe(undefined);
  });
});
