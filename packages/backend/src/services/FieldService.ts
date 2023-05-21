import FieldModel from '../models/FieldModel'
import { Field } from '@litsurvey/common'

export default class {
  public static async createField(survey: Field): Promise<Field> {
    const createdField = await FieldModel.create({
      ...survey
    })
    return createdField.toJSON() as Field
  }

  public static async updateField(field: Field): Promise<Field | null> {
    const updatedField = await FieldModel.update(
      {
        ...field
      },
      { where: { id: field.id } }
    )
    if (updatedField[0] === 0) {
      return null
    }

    const updatedFieldData = await FieldModel.findByPk(field.id)
    return updatedFieldData?.toJSON() as Field
  }

  public static async getField(id: string): Promise<Field | null> {
    const field = await FieldModel.findOne({
      where: { id }
    })

    return field?.toJSON() ?? null
  }

  public static async getFieldsForSurvey(
    surveyid: string
  ): Promise<Array<Field>> {
    const fields: any = await FieldModel.findAll({
      where: { survey_id: surveyid }
    })

    // ???
    return JSON.parse(JSON.stringify(fields))
  }

  public static async deleteFieldByUserId(
    id: string,
    userid: string
  ): Promise<boolean> {
    const deletedFieldCount = await FieldModel.destroy({
      where: { id: id, user_id: userid }
    })
    if (deletedFieldCount === 0) {
      return false
    }
    return true
  }

  public static async deleteFieldById(id: string): Promise<boolean> {
    const deletedFieldCount = await FieldModel.destroy({ where: { id } })
    if (deletedFieldCount === 0) {
      return false
    }
    return true
  }
}
