import SurveyModel from '../models/SurveyModel'
import { Survey } from '@litsurvey/common'

export default class {
  public static async createSurvey(survey: Survey): Promise<Survey> {
    const createdSurvey = await SurveyModel.create({
      ...survey
    })
    return createdSurvey.toJSON() as Survey
  }

  public static async updateSurvey(survey: Survey): Promise<Survey | null> {
    const updatedSurvey = await SurveyModel.update(
      {
        ...survey
      },
      { where: { id: survey.id } }
    )
    if (updatedSurvey[0] === 0) {
      return null
    }
    const updatedUserData = await SurveyModel.findByPk(survey.id)
    return updatedUserData?.toJSON() as Survey
  }

  public static async getSurveysByUserId(
    userid: string
  ): Promise<Array<Survey>> {
    const surveys: any = await SurveyModel.findAll()
    return surveys as Array<Survey>
  }

  public static async getSurvey(surveyid: string): Promise<Survey> {
    const survey: any = await SurveyModel.findOne({
      where: { id: surveyid }
    })
    return survey.toJSON()
  }

  public static async deleteSurvey(id: string): Promise<boolean> {
    const deletedSurveyCount = await SurveyModel.destroy({
      where: { id }
    })
    if (deletedSurveyCount === 0) {
      return false
    }
    return true
  }
}
