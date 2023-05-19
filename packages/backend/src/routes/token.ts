import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import { ErrorCodes, JWT_SECRET } from '../const'
import { sendErrorResponse, sendJSONResponse } from '../utils'
import SessionService from '../services/SessionService'

export default async function (req: Request, res: Response) {
  const sessionID = req.cookies['litsurvey-session']

  if (!sessionID) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.UNAUTHORIZED,
        message: `invalid or expired SessionID, login again`
      },
      status: 401
    })
    return
  }

  const foundUser = (await SessionService.get(sessionID)) as any

  if (!foundUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.UNAUTHORIZED,
        message: `invalid or expired SessionID, login again`
      },
      status: 401
    })
    return
  }

  const jwtToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email
    },
    JWT_SECRET,
    {
      expiresIn: '30m' // THIS IS A BIT SUS
    }
  )

  sendJSONResponse(
    res,
    {
      data: {
        token: jwtToken
      },
      status: 200
    },
    200
  )
}
