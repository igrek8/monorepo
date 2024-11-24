import { readFileSync, type PathLike } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function readJSONFileSync<T = unknown>(filePath: PathLike): T {
  return JSON.parse(readFileSync(filePath, { encoding: 'utf-8' })) as T;
}
