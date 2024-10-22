import type { PathLike } from 'fs';
import { access, constants } from 'fs/promises';

export async function checkFileExists(filePath: PathLike) {
  try {
    await access(filePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}
