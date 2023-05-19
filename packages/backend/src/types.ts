import { Response, Request } from 'express'
import { UserType } from '@litsurvey/common/types/user'

export interface CommonContext {
  req: Request
  res: Response
}

export interface RegisterUser {
  username: string
  email: string
  password: string
  type: UserType
}

export interface LoginUser {
  username?: string
  email?: string
  password: string
}
