import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import { nanoid, hasAuth, getAuth } from '../../utils'

import { Response, FieldType } from '@litsurvey/common'

import jwt from 'jsonwebtoken'

import ResponseService from '../../services/ResponseService'
import SurveyService from '../../services/SurveyService'

async function getResponsesForSurvey(
  input: any,
  { req, res }: CommonContext,
  __: any
) {
  if (!hasAuth(req)) {
    throw new Error('Unauthorized')
  }

  let parsedAuth: any
  try {
    const jwtToken = getAuth(req)?.[1]
    parsedAuth = jwt.verify(jwtToken ?? '', JWT_SECRET)
  } catch {
    throw new Error('Unauthorized')
  }

  const foundResponses = await ResponseService.getResponsesForSurvey(
    input.survey_id
  )
  return foundResponses
}

async function createResponseForSurvey(
  input: any,
  { req, res }: CommonContext,
  _: any
) {
  if (!hasAuth(req)) {
    throw new Error('Unauthorized')
  }

  let parsedAuth: any
  try {
    const jwtToken = getAuth(req)?.[1]
    parsedAuth = jwt.verify(jwtToken ?? '', JWT_SECRET)
  } catch {
    throw new Error('Unauthorized')
  }

  if (!Object.keys(FieldType).includes(input.type)) {
    throw new Error('Bad input, bad field type')
  }

  const foundSurvey = await SurveyService.getSurveyByUserId(
    input.survey_id,
    parsedAuth.id
  )

  if (foundSurvey.length === 0) {
    throw new Error('Invalid survey ID')
  }

  const response: Response = {
    id: nanoid(),
    survey_id: input.survey_id,
    user_id: parsedAuth.id,
    field_id: input.field_id,
    type: input.type,
    response: input.response
  }
  await ResponseService.createResponse(response)
  return response
}

export default {
  response: getResponsesForSurvey,
  createResponse: createResponseForSurvey
}
