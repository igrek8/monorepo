import { readFile } from 'fs/promises';
export async function readJSONFile(filePath) {
    return JSON.parse(await readFile(filePath, { encoding: 'utf-8' }));
}
//# sourceMappingURL=read-json-file.js.map