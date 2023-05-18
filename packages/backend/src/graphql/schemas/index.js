"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var graphql_1 = require("graphql");
var TOTAL_SCHEMAS = 1;
console.assert(TOTAL_SCHEMAS === 1, "[INFO] Exhaustive handling of schemas, total: ".concat(TOTAL_SCHEMAS));
var userSchema = node_fs_1.default.readFileSync(node_path_1.default.join(__dirname, 'user.graphql'), 'utf8');
exports.default = (0, graphql_1.buildSchema)("".concat(userSchema));
