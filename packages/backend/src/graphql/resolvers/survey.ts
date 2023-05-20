import { JWT_SECRET } from '../../const'
import { CommonContext } from '../../types'

import jwt from 'jsonwebtoken'
import SurveyService from '../../services/SurveyService'

async function getSurvey(_: any, args: CommonContext, __: any) {}

async function createSurvey(_: any, args: CommonContext, __: any) {
  /* TODO */
}

export default {
  survey: getSurvey,
  createSurvey: createSurvey
}
