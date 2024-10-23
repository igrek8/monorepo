import { describe, expect, it } from 'vitest';
import { isConfig } from './is-config.js';

describe('isValidConfig', () => {
  it('returns true', () => {
    expect(isConfig({ db: 'db' })).toBe(true);
  });

  it('returns false', () => {
    expect(isConfig({ db: 0 })).toBe(false);
  });
});
