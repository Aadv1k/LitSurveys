"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_graphql_1 = require("express-graphql");
var schemas_1 = require("./graphql/schemas/");
var resolvers_1 = require("./graphql/resolvers/");
var register_1 = require("./routes/register");
var app = (0, express_1.default)();
var GraphQLMiddleware = (0, express_graphql_1.graphqlHTTP)(function (req, res) {
    return {
        schema: schemas_1.default,
        rootValue: resolvers_1.default,
        graphiql: true,
        context: { req: req, res: res }
    };
});
app.use(express_1.default.json());
app.use('/graphql', GraphQLMiddleware);
app.get("/", function (req, res) {
    res.send("You got bamboozled");
});
app.post("/auth/register", register_1.default);
exports.default = app;
