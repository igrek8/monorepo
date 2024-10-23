import { describe, expect, it, vi } from 'vitest';
import { isConfig } from './isConfig';
import { readConfigSync } from './readConfigSync';
import { readJSONFileSync } from './readJSONFileSync';

vi.mock('./readJSONFileSync');
vi.mock('./isConfig');

describe('readConfig', () => {
  it('reads and parses a JSON config file', () => {
    vi.mocked(readJSONFileSync).mockReturnValueOnce({ db: 'mydb' });
    vi.mocked(isConfig).mockReturnValueOnce(true);
    expect(readConfigSync('config.json')).toStrictEqual({ db: 'mydb' });
  });

  it('throws an error for an invalid config', () => {
    vi.mocked(readJSONFileSync).mockReturnValueOnce({ key: 'value' });
    vi.mocked(isConfig).mockReturnValueOnce(false);
    expect(() => readConfigSync('config.json')).toThrow('Invalid config');
  });
});
