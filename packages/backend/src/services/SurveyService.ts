import SurveyModel from '../models/SurveyModel'
import { Survey, SurveyStatus } from '@litsurvey/common/types/survey'

export default class {
  public static async createSurvey(survey: Survey): Promise<Survey> {
    const createdUser = await SurveyModel.create({
      ...survey
    })
    return createdUser.toJSON() as Survey
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

  public static async deleteSurveyById(id: string): Promise<boolean> {
    const deletedSurveyCount = await SurveyModel.destroy({ where: { id } })
    if (deletedSurveyCount === 0) {
      return false
    }
    return true
  }
}
