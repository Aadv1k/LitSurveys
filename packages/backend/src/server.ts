import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { sendErrorResponse } from './utils'
import { ErrorCodes } from './const'

import GraphQLSchema from './graphql/schemas/'
import GraphQLResolvers from './graphql/resolvers/'

import RouteRegister from './routes/register'
import RouteLogin from './routes/login'
import RouteToken from './routes/token'
import RouteLogout from './routes/logout'

import oAuthGoogle from './routes/oAuthGoogle'
import oAuthGoogleCallback from './routes/oAuthGoogleCallback'

import cookieParser from 'cookie-parser'

import passport from 'passport'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

const GraphQLMiddleware = graphqlHTTP((req, res) => {
  return {
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true,
    context: { req, res }
  }
})

app.use('/graphql', GraphQLMiddleware)

app.get('/', (req, res) => {
  res.send('You got bamboozled')
})

app.post('/auth/register', RouteRegister)
app.post('/auth/login', RouteLogin)
app.get('/auth/token', RouteToken)
app.get('/auth/logout', RouteLogout)

app.get(
  '/auth/oauth/google',
  oAuthGoogle.authenticate('google', { scope: ['profile', 'email'] })
)

app.get('/auth/oauth/google/callback', (req, res, next) => {
  passport.authenticate(
    'google',
    { failureRedirect: '/login' },
    async (err: any, user: any) => {
      await oAuthGoogleCallback(req, res, user)
    }
  )(req, res, next)
})

app.all(
  ['/auth/register', '/auth/login', '/auth/token', '/auth/logout'],
  (req, res) => {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.METHOD_INVALID,
        message: `${req.method} is not valid for ${req.url}`
      },
      status: 405
    })
  }
)

app.use((req, res) => {
  sendErrorResponse(res, {
    error: {
      code: ErrorCodes.NOT_FOUND,
      message: `${req.url} was not found or the method was invalid`
    },
    status: 404
  })
})

export default app
