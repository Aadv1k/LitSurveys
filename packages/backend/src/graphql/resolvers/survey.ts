import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import jwt from "jsonwebtoken";
import SurveyService from "../../services/SurveyService";


async function getSurvey(_: any, args: CommonContext, __: any) {
  const token = args.req.headers?.authorization

  if (!token) {
    throw new Error('Unauthorized') // TODO: Make this a proper error
  }

  let parsedToken: any
  try {
    parsedToken = jwt.verify(token, JWT_SECRET)
  } catch {
    throw new Error('Invalid token') // TODO: Make this a proper error
  }

  const foundUser = await SurveySurvice.getUserByEmail(parsedToken.email ?? '')

  if (!foundUser) {
    throw new Error('User not found') // TODO: Make this a proper error
  }

  return {
    username: foundUser.username,
    email: foundUser.email,
    token: jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email
      },
      JWT_SECRET
    )
  }


}




async function createSurvey(_: any, args: CommonContext, __: any) { /* TODO */ }

export default {
  survey: getSurvey,
  createSurvey: createSurvey

}
