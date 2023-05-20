import fs from 'node:fs'
import path from 'node:path'

import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

const userSchema = fs.readFileSync(path.join(__dirname, 'user.graphql'), 'utf8')
const surveySchema = fs.readFileSync(
  path.join(__dirname, 'survey.graphql'),
  'utf8'
)
const responseSchema = fs.readFileSync(
  path.join(__dirname, 'response.graphql'),
  'utf8'
)
const fieldSchema = fs.readFileSync(
  path.join(__dirname, 'field.graphql'),
  'utf8'
)

const mergedSchema = mergeTypeDefs([
  userSchema,
  surveySchema,
  fieldSchema,
  responseSchema
])
export default makeExecutableSchema({ typeDefs: mergedSchema })
