import { Request, Response } from 'express'
import Ajv from 'ajv'
import SessionService from '../services/SessionService'

import { ErrorCodes } from '../const'
import { sendErrorResponse, sendJSONResponse } from '../utils'

import md5 from 'md5'

import { User } from '@litsurvey/common'

import { v4 as uuid } from 'uuid'
import UserService from '../services/UserService'

//import passport from "passport";

export default async function (req: Request, res: Response, passportUser: any) {
  const user = passportUser

  if (!user) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.INTERNAL_ERROR,
        message: 'Something went wrong in OAuth process'
      },
      status: 500
    })
    return
  }

  const userToCreate = {
    email: user.email,
    password: md5(uuid()),
    username: user.displayName,
    id: uuid(),
    type: 'surveyee'
  } as User

  const foundUser = await UserService.getUserByEmail(userToCreate.email)

  const sessionID = md5(user.email)

  if (foundUser) {
    await SessionService.push(sessionID, {
      username: foundUser.username,
      email: foundUser.email,
      type: foundUser.type
    })

    res.cookie('litsurvey-session', sessionID, { httpOnly: true })

    sendJSONResponse(
      res,
      {
        data: {
          username: foundUser.username,
          email: foundUser.email,
          type: foundUser.type
        },
        status: 200
      },
      200
    )
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

  await SessionService.push(sessionID, {
    username: createdUser.username,
    email: createdUser.email,
    type: createdUser.type
  })

  res.cookie('litsurvey-session', sessionID, { httpOnly: true })

  sendJSONResponse(
    res,
    {
      data: {
        username: createdUser.username,
        email: createdUser.email,
        type: createdUser.type
      },
      status: 200
    },
    200
  )
}
