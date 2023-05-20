import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import { nanoid } from '../../utils'

import { Field, FieldType } from '@litsurvey/common'

import jwt from 'jsonwebtoken'

import FieldService from '../../services/FieldService'
import SurveyService from '../../services/SurveyService'

async function getFieldsForSurvey(input: any, args: CommonContext, __: any) {
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

  const foundFields = await FieldService.getFieldsBySurveyId(input.survey_id)
  return foundFields
}

async function createFieldForSurvey(
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

  const field: Field = {
    id: nanoid(),
    survey_id: input.survet_id,
    user_id: parsedAuth.id,
    question: input.question,
    response_options: input.response_options,
    type: input.type
  }
  await FieldService.createField(field)
  return field
}

export default {
  survey: getFieldsForSurvey,
  createSurvey: createFieldForSurvey
}