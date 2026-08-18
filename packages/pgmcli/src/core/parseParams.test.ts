import { describe, expect, it } from 'vitest';
import { parseParams } from './parseParams.js';

describe('parseParams', () => {
  it.each([
    {
      title: 'parse',
      input: '-- @detached\r\n-- @run always\n\r',
      output: { detached: undefined, run: 'always' },
    },
  ])('$title', ({ input, output }) => {
    expect(parseParams(input)).toEqual(output);
  });
});
