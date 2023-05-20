import { Request, Response } from 'express'
import Ajv from 'ajv'

import SessionService from '../services/SessionService'

import { ErrorCodes } from '../const'
import { sendErrorResponse, sendJSONResponse, nanoid } from '../utils'
import { RegisterUser } from '../types'

import { User } from '@litsurvey/common'

import UserService from '../services/UserService'

import RegisterSchema from '../httpSchemas/register'

const ajv = new Ajv({ allErrors: true })

ajv.addFormat('email', {
  type: 'string',
  validate: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
})

export default async function (req: Request, res: Response) {
  let body: RegisterUser

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

  const isBodyValid = ajv.validate(RegisterSchema, body)
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

  const userToCreate = {
    ...body,
    id: nanoid()
  } as User

  const foundUser = await UserService.getUserByEmail(body.email)

  if (foundUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.BAD_INPUT,
        message: 'User has already registered'
      },
      status: 400
    })
    return
  }

  const createdUser = await UserService.createUser(userToCreate)

  if (!createdUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.DATABASE_ERROR,
        message: 'Failed to create a new user'
      },
      status: 500
    })
    return
  }

  const sessionID = nanoid()
  await SessionService.push(sessionID, {
    id: createdUser.id,
    username: createdUser.username,
    type: createdUser.type
  })

  res.cookie('litsurvey-session', sessionID, { httpOnly: true })

  sendJSONResponse(
    res,
    {
      data: {
        id: createdUser.id,
        username: createdUser.username,
        type: createdUser.type
      },
      status: 200
    },
    200
  )
}
