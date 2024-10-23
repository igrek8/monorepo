import { describe, expect, it, vi } from 'vitest';
import { checkFileExists } from './check-file-exists.js';
import type { Config } from './config.interface.js';
import { getConfigPath } from './get-config-path.js';
import { readConfig } from './read-config.js';
import { resolveConfig } from './resolve-config.js';

vi.mock('./get-config-path.js');
vi.mock('./read-config.js');
vi.mock('./check-file-exists.js');

describe('resolveConfig', () => {
  it('resolves config', async () => {
    const config: Config = { host: 'localhost', port: 5432 };
    vi.mocked(getConfigPath).mockReturnValueOnce('my-config.json');
    vi.mocked(readConfig).mockResolvedValueOnce(config);
    vi.mocked(checkFileExists).mockResolvedValueOnce(true);
    await expect(resolveConfig(['--config', 'my-config.json'])).resolves.toBe(config);
  });

  it('returns undefined if config does not exist', async () => {
    vi.mocked(getConfigPath).mockReturnValueOnce('my-config.json');
    vi.mocked(checkFileExists).mockResolvedValueOnce(false);
    await expect(resolveConfig(['--config', 'my-config.json'])).resolves.toBeUndefined();
  });

  it('tries to read default config if no path is provided', async () => {
    const config: Config = { host: 'localhost', port: 5432 };
    vi.mocked(getConfigPath).mockReturnValueOnce(undefined);
    vi.mocked(readConfig).mockResolvedValueOnce(config);
    vi.mocked(checkFileExists).mockResolvedValueOnce(true);
    await expect(resolveConfig([])).resolves.toBe(config);
  });
});
