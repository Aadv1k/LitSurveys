import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import { nanoid, hasAuth, getAuth } from '../../utils'

import { Survey, SurveyStatus } from '@litsurvey/common'

import jwt from 'jsonwebtoken'
import SurveyService from '../../services/SurveyService'

import {
  SURVEY_MAX_TITLE_LEN,
  SURVEY_MAX_DESC_LEN,
  SURVEY_MAX_RESPONSES
} from '@litsurvey/common'

function hasSpecialCharacters(title: string): boolean {
  const pattern = /^[a-zA-Z0-9\s]+$/
  return !pattern.test(title)
}

async function getSurvey(
  _: any,
  { req, res }: CommonContext,
  __: any
): Promise<Array<Survey>> {
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
  const foundSurveys = await SurveyService.getSurveysByUserId(parsedToken.id)
  return foundSurveys
}

async function createSurvey(input: any, { req, res }: CommonContext, _: any) {
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

  if (!Object.keys(SurveyStatus).includes(input.status)) {
    throw new Error('Bad input, invalid survey status')
  }

  if (input.title.length > SURVEY_MAX_TITLE_LEN || input.title.length < 4) {
    throw new Error('Bad input, title too short')
  }

  if (hasSpecialCharacters(input.title)) {
    throw new Error('Bad input, invalid characters within title')
  }

  if (
    input.description.length > SURVEY_MAX_DESC_LEN ||
    input.description.length < 1
  ) {
    throw new Error('Bad input, description too long or short')
  }

  if (input.max_responses < SURVEY_MAX_RESPONSES) {
    throw new Error('Bad input, cant have that many responses')
  }

  const survey: Survey = {
    id: nanoid(),
    created_at: Date.now(),
    user_id: parsedAuth.id,
    title: input.title,
    description: input.description,
    status: input.status,
    max_responses: input.max_responses
  }

  await SurveyService.createSurvey(survey)
  return survey
}

async function deleteSurvey(input: any, { req, res }: CommonContext, _: any) {
  const auth = req.headers['authorization']

  if (!auth) {
    throw new Error('Unauthorized')
  }

  const parsedAuth: any = jwt.verify(auth, JWT_SECRET)

  if (!parsedAuth || !parsedAuth.id) {
    throw new Error('Unauthorized')
  }

  const foundSurvey = await SurveyService.getSurvey(input)

  if (!foundSurvey) {
    throw new Error('Invalid Survey ID')
  }

  if (foundSurvey.user_id !== parsedAuth.id) {
    throw new Error('You do not own this survey')
  }

  const deletedSurvey = await SurveyService.deleteSurvey(input)

  if (!deletedSurvey) {
    throw new Error('No survey found with that criteria')
  }

  return input.id
}

export default {
  survey: getSurvey,
  createSurvey: createSurvey,
  deleteSurvey: deleteSurvey
}
