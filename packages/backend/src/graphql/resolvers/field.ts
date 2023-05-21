import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import { nanoid, hasAuth, getAuth } from '../../utils'

import { Field, FieldType } from '@litsurvey/common'

import jwt from 'jsonwebtoken'

import FieldService from '../../services/FieldService'
import SurveyService from '../../services/SurveyService'

async function getFieldsForSurvey(input: any, args: CommonContext, __: any) {
  if (!hasAuth(args.req)) {
    throw new Error('Unauthorized')
  }

  try {
    const jwtToken = getAuth(args.req)?.[1]
    jwt.verify(jwtToken ?? '', JWT_SECRET)
  } catch {
    throw new Error('Unauthorized')
  }

  const foundFields = await FieldService.getFieldsForSurvey(input.survey_id)
  return foundFields
}

async function createFieldForSurvey(
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

  const foundSurvey = await SurveyService.getSurvey(input.survey_id)

  if (!foundSurvey) {
    throw new Error('Invalid survey ID')
  }

  if (foundSurvey.user_id !== parsedAuth.id) {
    throw new Error("you don't own this survey")
  }

  const field: Field = {
    id: nanoid(),
    survey_id: input.survey_id,
    user_id: parsedAuth.id,
    question: input.question,
    response_options: input.response_options,
    type: input.type
  }
  await FieldService.createField(field)
  return field
}

async function deleteFieldForSurvey(
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

  const foundSurvey = await SurveyService.getSurvey(input.survey_id)

  if (!foundSurvey) {
    throw new Error('Invalid survey ID')
  }

  if (foundSurvey.user_id !== parsedAuth.id) {
    throw new Error("you don't own this survey")
  }

  const deleted = await FieldService.deleteFieldByUserId(
    input.id,
    parsedAuth.id
  )

  return deleted ? input.id : null
}

export default {
  field: getFieldsForSurvey,
  createField: createFieldForSurvey,
  deleteField: deleteFieldForSurvey
}
