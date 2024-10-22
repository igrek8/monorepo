import { access, constants } from 'fs/promises';
export async function checkFileExists(filePath) {
    try {
        await access(filePath, constants.R_OK);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=check-file-exists.js.map