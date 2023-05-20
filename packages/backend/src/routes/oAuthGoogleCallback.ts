import { Request, Response } from 'express'
import SessionService from '../services/SessionService'

import { ErrorCodes } from '../const'
import { sendErrorResponse, sendJSONResponse, nanoid } from '../utils'

import md5 from 'md5'

import { User } from '@litsurvey/common'
import UserService from '../services/UserService'

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
    password: md5(nanoid()),
    username: user.displayName,
    id: nanoid(),
    type: 'surveyee'
  } as User

  const foundUser = await UserService.getUserByEmail(userToCreate.email)

  const sessionID = md5(user.email)

  if (foundUser) {
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
