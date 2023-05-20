import fs from 'node:fs'
import path from 'node:path'

import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

const TOTAL_SCHEMAS = 2

console.assert(
  TOTAL_SCHEMAS === 2,
  `[INFO] Exhaustive handling of schemas, total: ${TOTAL_SCHEMAS}`
)

const userSchema = fs.readFileSync(path.join(__dirname, 'user.graphql'), 'utf8')
const surveySchema = fs.readFileSync(
  path.join(__dirname, 'survey.graphql'),
  'utf8'
)

const mergedSchema = mergeTypeDefs([userSchema, surveySchema])
export default makeExecutableSchema({ typeDefs: mergedSchema })
