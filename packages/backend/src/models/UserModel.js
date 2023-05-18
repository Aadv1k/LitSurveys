"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var bootstrap_1 = require("./bootstrap");
var UserModel = {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
};
var table = bootstrap_1.default.define('users', UserModel);
table.sync();
exports.default = table;
