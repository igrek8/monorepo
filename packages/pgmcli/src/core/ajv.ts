import cjs from 'ajv';
import schema from './schema.json' with { type: 'json' };

export const ajv = new cjs.Ajv({ strict: true });

ajv.addSchema(schema, '#');
