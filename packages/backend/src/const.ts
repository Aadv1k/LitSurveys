import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
  path: path.join('__dirname', '../../../.env')
})

export const PORT = process.env.PORT || 8080

export const PG_CONFIG = {
  host: 'db.bit.io',
  port: 5432,
  dbName: 'killerrazerblade/litsurveys',
  password: process.env.PG_PASSWORD,
  username: process.env.PG_USERNAME
}

export const REDIS_CONFIG = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
}

export const JWT_SECRET = 'to-be-changed'

export enum ErrorCodes {
  DATABASE_ERROR = 'database_error',
  USER_NOT_FOUND = 'user_not_found',
  EXTERNAL_SERVICE = 'external_service_error',
  RESOURCE_NOT_FOUND = 'resource_not_found_error',
  UNAUTHORIZED = "unauthorized",
  BAD_INPUT = 'bad_input',
  NOT_FOUND = 'not_found',
  INVALID_PASSWORD = 'invalid_password',
  TOO_MANY_REQUESTS = 'too_many_requests',
  INTERNAL_ERROR = 'internal_error',
  METHOD_INVALID = 'method_invalid'
}

export interface ApiError {
  error: {
    code: ErrorCodes
    message: string
    details?: any
  }
  status: number
}
