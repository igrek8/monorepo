"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
class Box {
    value;
    constructor(value) {
        this.value = value;
        Object.seal(this);
    }
    get [Symbol.toStringTag]() {
        return Box.name;
    }
}
exports.Box = Box;
//# sourceMappingURL=Box.js.map