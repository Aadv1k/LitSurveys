"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var const_1 = require("../const");
var connection_url = "postgresql://".concat(const_1.PG_CONFIG.username, ":").concat(const_1.PG_CONFIG.password, "@").concat(const_1.PG_CONFIG.host, ":").concat(const_1.PG_CONFIG.port, "/").concat(const_1.PG_CONFIG.dbName, "?sslmode=require");
exports.default = new sequelize_1.Sequelize(connection_url);
