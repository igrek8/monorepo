import { describe, expect, it, vi } from 'vitest';
import { isConfig } from './is-config.js';
import { readConfig } from './read-config.js';
import { readJSONFile } from './read-json-file.js';

vi.mock('./read-json-file.js');
vi.mock('./is-config.js');

describe('readConfig', () => {
  it('reads and parses a JSON config file', async () => {
    vi.mocked(readJSONFile).mockResolvedValueOnce({ db: 'mydb' });
    vi.mocked(isConfig).mockReturnValueOnce(true);
    await expect(readConfig('config.json')).resolves.toStrictEqual({ db: 'mydb' });
  });

  it('throws an error for an invalid config', async () => {
    vi.mocked(readJSONFile).mockResolvedValueOnce({ key: 'value' });
    vi.mocked(isConfig).mockReturnValueOnce(false);
    await expect(readConfig('config.json')).rejects.toThrow('Invalid config');
  });
});
