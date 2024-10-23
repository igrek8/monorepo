import { describe, expect, it } from 'vitest';
import { isConfig } from './isConfig';

describe('isConfig', () => {
  it('returns true', () => {
    expect(isConfig({ db: 'db' })).toBe(true);
  });

  it('returns false', () => {
    expect(isConfig({ db: 0 })).toBe(false);
  });
});
