import Ajv from 'ajv';
import * as path from 'path';

export const ajv = new Ajv({ strict: true });

// eslint-disable-next-line @typescript-eslint/no-require-imports
ajv.addSchema(require(path.join(__dirname, '..', '..', 'schema.json')), '#');
