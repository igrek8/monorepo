import { access } from 'fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { checkFileExists } from './check-file-exists.js';

vi.mock('fs/promises');

describe('checkFileExists', () => {
  it('returns true if the file exists', async () => {
    vi.mocked(access).mockResolvedValueOnce();
    await expect(checkFileExists('file.txt')).resolves.toBe(true);
  });

  it('returns false if the file does not exist', async () => {
    vi.mocked(access).mockRejectedValueOnce(new Error('File not found'));
    await expect(checkFileExists('file.txt')).resolves.toBe(false);
  });
});
