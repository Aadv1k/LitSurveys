import fs from 'node:fs'
import path from 'node:path'
import { buildSchema } from 'graphql'

const TOTAL_SCHEMAS = 1

console.assert(
  TOTAL_SCHEMAS === 1,
  `[INFO] Exhaustive handling of schemas, total: ${TOTAL_SCHEMAS}`
)

const userSchema = fs.readFileSync(path.join(__dirname, 'user.graphql'), 'utf8')

export default buildSchema(`${userSchema}`)
