import { Request, Response } from 'express'
import Ajv from 'ajv'

import { ErrorCodes, JWT_SECRET } from '../const'
import { sendErrorResponse, sendJSONResponse } from '../utils'
import { LoginUser } from '../types'

import md5 from 'md5'

import UserService from '../services/UserService'
import SessionService from '../services/SessionService'

import LoginSchema from '../httpSchemas/login'

const ajv = new Ajv({ allErrors: true })

ajv.addFormat('email', {
  type: 'string',
  validate: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
})

export default async function (req: Request, res: Response) {
  let body: LoginUser

  try {
    body = req.body
  } catch (err) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.BAD_INPUT,
        message: 'Invalid JSON data'
      },
      status: 400
    })
    return
  }

  const isBodyValid = ajv.validate(LoginSchema, body)
  if (!isBodyValid) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.BAD_INPUT,
        message: 'Bad input',
        details: ajv.errors
      },
      status: 400
    })
    return
  }

  let foundUser
  if (body.username) {
    foundUser = await UserService.getUserByUsername(body.username)
  } else if (body.email) {
    foundUser = await UserService.getUserByEmail(body.email)
  }

  if (!foundUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.USER_NOT_FOUND,
        message: `user ${body.email ?? body.username} does not exist`
      },
      status: 400
    })
    return
  }

  if (foundUser.password !== body.password) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.INVALID_PASSWORD,
        message: `invalid password for ${body.email ?? body.username}`
      },
      status: 400
    })

    return
  }

  const sessionID = md5(foundUser.email)
  await SessionService.push(sessionID, {
    id: foundUser.id,
    username: foundUser.username,
    type: foundUser.type
  })

  res.cookie('litsurvey-session', sessionID, { httpOnly: true })

  sendJSONResponse(
    res,
    {
      data: {
        id: foundUser.id,
        username: foundUser.username,
        type: foundUser.type
      },
      status: 200
    },
    200
  )
}
