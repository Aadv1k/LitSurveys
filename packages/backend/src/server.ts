import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { sendErrorResponse } from "./utils";
import { ErrorCodes } from "./const";

import GraphQLSchema from "./graphql/schemas/";
import GraphQLResolvers from "./graphql/resolvers/";


import RouteRegister from "./routes/register";
import RouteLogin from "./routes/login";

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());


const GraphQLMiddleware = graphqlHTTP((req, res) => {
  return {
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true,
    context: { req, res }
  };
});

app.use('/graphql', GraphQLMiddleware);

app.get("/", (req, res) => {
  res.send("You got bamboozled");
});


app.post("/auth/register", RouteRegister);
app.post("/auth/login", RouteLogin);

app.all(["/auth/register", "/auth/login"], (req, res) => {
  sendErrorResponse(res, {
    error: {
      code: ErrorCodes.METHOD_INVALID,
      message: `${req.method} is not valid for ${req.url}`
    },
    status: 405
  });
})

app.use((req, res) => {
  sendErrorResponse(res, {
    error: {
      code: ErrorCodes.NOT_FOUND,
      message: `${req.url} was not found or the method was invalid`
    },
    status: 404
  });
})


export default app;
