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

export const JWT_SECRET = 'to-be-changed'

export enum ErrorCodes {
  VALIDATION = 'validation_error',
  DATABASE = 'database_error',
  EXTERNAL_SERVICE = 'external_service_error',
  RESOURCE_NOT_FOUND = 'resource_not_found_error',
  BAD_INPUT = "bad_input",
  TOO_MANY_REQUESTS = "too_many_requests",
  INTERNAL_ERROR = "internal_error",
}

export interface ApiError {
  error: {
    code: ErrorCodes,
      message: string,
      details?: any,
  }
  status: number,
}
