import { ajv } from './ajv.js';
export function isValidConfig(config) {
    return ajv.validate('#', config);
}
//# sourceMappingURL=is-valid-config.js.map