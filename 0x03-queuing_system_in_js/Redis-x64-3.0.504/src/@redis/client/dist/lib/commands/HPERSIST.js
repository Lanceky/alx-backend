"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
const generic_transformers_1 = require("./generic-transformers");
exports.FIRST_KEY_INDEX = 1;
function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArgument)(['HPERSIST', key, 'FIELDS'], fields);
}
exports.transformArguments = transformArguments;
