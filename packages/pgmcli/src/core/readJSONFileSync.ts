import { readFileSync, type PathLike } from 'fs';

export function readJSONFileSync<T = unknown>(filePath: PathLike): T {
  return JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }));
}
