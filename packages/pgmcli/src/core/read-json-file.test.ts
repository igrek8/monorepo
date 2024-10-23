import { readFile } from 'fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { readJSONFile } from './read-json-file.js';

vi.mock('fs/promises');

describe('readJSONFile', () => {
  it('reads and parses a JSON file', async () => {
    vi.mocked(readFile).mockResolvedValueOnce('{ "key": "value" }');
    await expect(readJSONFile('file.json')).resolves.toStrictEqual({ key: 'value' });
  });
});
