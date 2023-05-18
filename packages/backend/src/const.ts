import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
  path: path.join('__dirname', '../../../.env')
})

export const PORT = process.env.PORT || 3000

export const PG_CONFIG = {
  host: 'db.bit.io',
  port: 5432,
  dbName: 'killerrazerblade/litsurveys',
  password: process.env.PG_PASSWORD,
  username: process.env.PG_USERNAME
}

export const JWT_SECRET = 'to-be-changed'

export const ERRORS = {
  INTERNAL_ERROR: 'internal_error'
}
