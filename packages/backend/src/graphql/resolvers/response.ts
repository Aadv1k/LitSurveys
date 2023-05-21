import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import { nanoid, hasAuth, getAuth } from '../../utils'

import { Response, FieldType } from '@litsurvey/common'

import jwt from 'jsonwebtoken'

import ResponseService from '../../services/ResponseService'
import SurveyService from '../../services/SurveyService'
import FieldService from '../../services/FieldService'

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
  { input }: any,
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

  const foundField = await FieldService.getField(input.field_id)

  if (!foundField) {
    throw new Error('Invalid field ID')
  }

  if (foundField.type !== input.type) {
    throw new Error("field type and input type mismatch");
  }

  if (foundField.type !== "any") {
    if (!Number(input.response)) {
      throw new Error(`${foundField.type} expects a integer as a response`)
    }
  }


  const response: Response = {
    id: nanoid(),
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
