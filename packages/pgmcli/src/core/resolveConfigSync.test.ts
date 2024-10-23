import { existsSync } from 'fs';
import { describe, expect, it, vi } from 'vitest';
import type { Config } from './Config';
import { getConfigPath } from './getConfigPath';
import { readConfigSync } from './readConfigSync';
import { resolveConfigSync } from './resolveConfigSync';

vi.mock('fs');
vi.mock('./getConfigPath');
vi.mock('./readConfigSync');

describe('resolveConfigSync', () => {
  it('resolves config', () => {
    const config: Config = { host: 'localhost', port: 5432 };
    vi.mocked(getConfigPath).mockReturnValueOnce('my-config.json');
    vi.mocked(readConfigSync).mockReturnValueOnce(config);
    vi.mocked(existsSync).mockReturnValueOnce(true);
    expect(resolveConfigSync(['--config', 'my-config.json'])).toBe(config);
  });

  it('returns undefined if config does not exist', () => {
    vi.mocked(getConfigPath).mockReturnValueOnce('my-config.json');
    vi.mocked(existsSync).mockReturnValueOnce(false);
    expect(resolveConfigSync(['--config', 'my-config.json'])).toBeUndefined();
  });

  it('tries to read default config if no path is provided', () => {
    const config: Config = { host: 'localhost', port: 5432 };
    vi.mocked(getConfigPath).mockReturnValueOnce(undefined);
    vi.mocked(readConfigSync).mockReturnValueOnce(config);
    vi.mocked(existsSync).mockReturnValueOnce(true);
    expect(resolveConfigSync([])).toBe(config);
  });
});
