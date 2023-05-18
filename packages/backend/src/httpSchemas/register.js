"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        type: { enum: ['surveyor', 'surveyee', 'any'] },
    },
    required: ['username', 'email', 'password', 'type'],
};
exports.default = schema;
