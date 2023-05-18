"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var bootstrap_1 = require("./bootstrap");
var SurveyModel = {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    maxResposnes: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
};
var table = bootstrap_1.default.define('surveys', SurveyModel);
table.sync();
exports.default = table;
