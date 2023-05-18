import express from 'express'
import { graphqlHTTP } from 'express-graphql';

import GraphQLSchema from "./graphql/schemas/";
import GraphQLResolvers from "./graphql/resolvers/";

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: GraphQLSchema,
  rootValue: GraphQLResolvers,
  graphiql: true // Enable the GraphiQL UI
}));

export default app
