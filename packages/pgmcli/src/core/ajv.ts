import pkg from 'ajv';
import path from 'node:path';

const { Ajv } = pkg;

export const ajv = new Ajv({ strict: true });

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-argument
ajv.addSchema(require(path.join(__dirname, '..', '..', 'schema.json')), '#');
