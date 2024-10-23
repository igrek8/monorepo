import Ajv from 'ajv';
import schema from './schema.json' with { type: 'json' };

export const ajv = new Ajv.default({ strict: true });

ajv.addSchema(schema, '#');
