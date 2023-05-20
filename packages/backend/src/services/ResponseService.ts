import ResponseModel from '../models/ResponseModel'
import { Response } from '@litsurvey/common'

export default class {
  public static async createResponse(survey: Response): Promise<Response> {
    const createdResponse = await ResponseModel.create({
      ...survey
    })
    return createdResponse.toJSON() as Response
  }

  public static async getResponsesForSurvey(
    surveyid: string
  ): Promise<Array<Response>> {
    const responses: any = await ResponseModel.findAll({
      where: { survey_id: surveyid }
    })
    return responses as Array<Response>
  }
}
