import { Request, Response } from 'express'

//import jwt from 'jsonwebtoken'
//import { ErrorCodes, JWT_SECRET } from '../const'
import { sendErrorResponse, sendJSONResponse } from '../utils'

import SessionService from '../services/SessionService'

export default async function (req: Request, res: Response) {
  const sessionID = req.cookies['litsurvey-session']

  await SessionService.delete(sessionID)

  sendJSONResponse(
    res,
    {
      status: 200
    },
    200
  )
}
