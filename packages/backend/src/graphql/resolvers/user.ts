import { CommonContext } from '../../types'
import { JWT_SECRET } from '../../const'
import { hasAuth, getAuth } from '../../utils'

import UserService from '../../services/UserService'
import SurveyService from '../../services/SurveyService'
import FieldService from '../../services/FieldService'
import ResponseService from '../../services/ResponseService'

import jwt from 'jsonwebtoken'

interface ReturnUser {
  id: string
  username: string
  token?: string
}

async function takeoutData(
  { input }: any,
  { req, res }: CommonContext,
  __: any
) {
  if (!hasAuth(req)) {
    throw new Error('Unauthorized')
  }

  let parsedToken: any
  try {
    const jwtToken = getAuth(req)?.[1]
    parsedToken = jwt.verify(jwtToken ?? '', JWT_SECRET)
  } catch {
    throw new Error('Unauthorized')
  }

  const foundUser = await UserService.getUserById(parsedToken.id ?? '')

  if (!foundUser) {
    throw new Error('User not found') // TODO: Make this a proper error
  }

  const blob = {} as any

  let foundSurveys = await SurveyService.getSurveysByUserId(parsedToken.id)
  if (input.surveys === true) {
    blob.surveys = foundSurveys
  }

  if (input.responses === true) {
    const foundResponses = foundSurveys.map(async (e) => {
      return await ResponseService.getResponsesForSurvey(e.id)
    })
    blob.responses = foundResponses
  }

  if (input.fields === true) {
    const foundFields = foundSurveys.map(async (e) => {
      return await FieldService.getFieldsForSurvey(e.id)
    })
    blob.fields = foundFields
  }

  return blob
}

async function getUser(
  _: any,
  { req, res }: CommonContext,
  __: any
): Promise<ReturnUser> {
  if (!hasAuth(req)) {
    throw new Error('Unauthorized')
  }

  let parsedToken: any
  try {
    const jwtToken = getAuth(req)?.[1]
    parsedToken = jwt.verify(jwtToken ?? '', JWT_SECRET)
  } catch {
    throw new Error('Unauthorized')
  }

  const foundUser = await UserService.getUserById(parsedToken.id ?? '')

  if (!foundUser) {
    throw new Error('User not found') // TODO: Make this a proper error
  }

  return {
    username: foundUser.username,
    id: foundUser.id,
    token: jwt.sign(
      {
        username: foundUser.username,
        id: foundUser.id
      },
      JWT_SECRET
    )
  }
}

export default {
  user: getUser,
  takeout: takeoutData
}
