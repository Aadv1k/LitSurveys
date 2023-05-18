"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = require("ajv");
var jsonwebtoken_1 = require("jsonwebtoken");
var const_1 = require("../const");
var utils_1 = require("../utils");
var UserService_1 = require("../services/UserService");
var register_1 = require("../httpSchemas/register");
var ajv = new ajv_1.default({ allErrors: true });
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, isBodyValid, userToCreate, foundUser, createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        body = req.body;
                    }
                    catch (err) {
                        (0, utils_1.sendErrorResponse)(res, {
                            error: {
                                code: const_1.ErrorCodes.BAD_INPUT,
                                message: "Invalid JSON data",
                            },
                            status: 400
                        });
                        return [2 /*return*/];
                    }
                    isBodyValid = ajv.validate(register_1.default, body);
                    if (!isBodyValid) {
                        (0, utils_1.sendErrorResponse)(res, {
                            error: {
                                code: const_1.ErrorCodes.BAD_INPUT,
                                message: "Bad input",
                                details: ajv.errors,
                            },
                            status: 400
                        });
                        return [2 /*return*/];
                    }
                    userToCreate = __assign(__assign({}, body), { id: "TODO, CHANGE THIS" });
                    return [4 /*yield*/, UserService_1.default.getUserByEmail(body.email)];
                case 1:
                    foundUser = _a.sent();
                    if (foundUser) {
                        (0, utils_1.sendErrorResponse)(res, {
                            error: {
                                code: const_1.ErrorCodes.BAD_INPUT,
                                message: "User has already registered",
                                details: ajv.errors,
                            },
                            status: 400
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, UserService_1.default.createUser(userToCreate)];
                case 2:
                    createdUser = _a.sent();
                    if (!createdUser) {
                        (0, utils_1.sendErrorResponse)(res, {
                            error: {
                                code: const_1.ErrorCodes.INTERNAL_ERROR,
                                message: "Failed to create a new user"
                            },
                            status: 500
                        });
                        return [2 /*return*/];
                    }
                    (0, utils_1.sendJSONResponse)(res, {
                        data: {
                            username: createdUser.username,
                            email: createdUser.email,
                            token: jsonwebtoken_1.default.sign({
                                username: createdUser.username,
                                email: createdUser.email
                            }, const_1.JWT_SECRET)
                        },
                        status: 201
                    }, 201);
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
