/* eslint-disable @typescript-eslint/consistent-type-definitions */

type KeyPair = {
  readonly key: string;
  readonly value?: string;
};

export function parseParams(s: string): Record<string, string | undefined> | undefined {
  const pattern = /^-- @(?<key>[a-z0-9]+(\.[a-z0-9]+)*)(?: (?<value>.+))?$/gim;
  let match: RegExpExecArray | null;
  let result: Record<string, string | undefined> | undefined;
  while ((match = pattern.exec(s)) !== null) {
    const { key, value } = match.groups as KeyPair;
    result ??= {};
    result[key] = value;
  }
  return result;
}
