import { readFileSync } from 'fs';
import { describe, expect, it, vi } from 'vitest';
import { readJSONFileSync } from './readJSONFileSync';

vi.mock('fs');

describe('readJSONFileSync', () => {
  it('reads and parses a JSON file', () => {
    vi.mocked(readFileSync).mockReturnValueOnce('{ "key": "value" }');
    expect(readJSONFileSync('file.json')).toStrictEqual({ key: 'value' });
  });
});
