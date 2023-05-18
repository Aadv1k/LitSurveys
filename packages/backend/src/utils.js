"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJSONResponse = exports.sendErrorResponse = void 0;
function sendErrorResponse(res, error) {
    res.status(error.status);
    res.json(error);
}
exports.sendErrorResponse = sendErrorResponse;
function sendJSONResponse(res, obj, status) {
    var _a, _b;
    res.status((_b = (_a = obj.status) !== null && _a !== void 0 ? _a : status) !== null && _b !== void 0 ? _b : 200);
    res.json(obj);
}
exports.sendJSONResponse = sendJSONResponse;
