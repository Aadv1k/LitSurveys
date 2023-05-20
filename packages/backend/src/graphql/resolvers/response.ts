import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import { nanoid } from '../../utils'

import { Response, FieldType } from '@litsurvey/common'

import jwt from 'jsonwebtoken'

import ResponseService from '../../services/ResponseService'
import SurveyService from '../../services/SurveyService'

async function getResponsesForSurvey(input: any, args: CommonContext, __: any) {
  const auth = args.req.headers['authorization']

  if (!auth) {
    throw new Error('Unauthorized')
  }

  let parsedToken: any
  try {
    parsedToken = jwt.verify(auth, JWT_SECRET)
  } catch {
    throw new Error('Unauthorzied')
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
  const auth = req.headers['authorization']

  if (!auth) {
    throw new Error('Unauthorized')
  }

  const parsedAuth: any = jwt.verify(auth, JWT_SECRET)

  if (!parsedAuth || !parsedAuth.id) {
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
  survey: getResponsesForSurvey,
  createSurvey: createResponseForSurvey
}
