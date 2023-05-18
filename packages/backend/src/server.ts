import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import GraphQLSchema from "./graphql/schemas/";
import GraphQLResolvers from "./graphql/resolvers/";

import RouteRegister from "./routes/register";

const app = express();
app.use(express.json());


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

export default app;
