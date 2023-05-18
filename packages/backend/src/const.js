"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.JWT_SECRET = exports.PG_CONFIG = exports.PORT = void 0;
var dotenv_1 = require("dotenv");
var node_path_1 = require("node:path");
dotenv_1.default.config({
    path: node_path_1.default.join('__dirname', '../../../.env')
});
exports.PORT = process.env.PORT || 8080;
exports.PG_CONFIG = {
    host: 'db.bit.io',
    port: 5432,
    dbName: 'killerrazerblade/litsurveys',
    password: process.env.PG_PASSWORD,
    username: process.env.PG_USERNAME
};
exports.JWT_SECRET = 'to-be-changed';
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["VALIDATION"] = "validation_error";
    ErrorCodes["DATABASE"] = "database_error";
    ErrorCodes["EXTERNAL_SERVICE"] = "external_service_error";
    ErrorCodes["RESOURCE_NOT_FOUND"] = "resource_not_found_error";
    ErrorCodes["BAD_INPUT"] = "bad_input";
    ErrorCodes["TOO_MANY_REQUESTS"] = "too_many_requests";
    ErrorCodes["INTERNAL_ERROR"] = "internal_error";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
