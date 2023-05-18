import express from 'express'
import { graphqlHTTP } from 'express-graphql';

import GraphQLSchema from "./graphql/schemas/";
import GraphQLResolvers from "./graphql/resolvers/";

const app = express()


const GraphQLMiddleware = graphqlHTTP((req, res) => {
  return {
      schema: GraphQLSchema,
      rootValue: GraphQLResolvers,
      graphiql: true,
      context: {req, res}
    }
})


app.use('/graphql', GraphQLMiddleware);

export default app
