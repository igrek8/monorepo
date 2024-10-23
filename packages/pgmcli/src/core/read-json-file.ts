import type { PathLike } from 'fs';
import { readFile } from 'fs/promises';

export async function readJSONFile(filePath: PathLike): Promise<unknown> {
  return JSON.parse(await readFile(filePath, { encoding: 'utf-8' }));
}
