import { FieldType } from './field'

export interface Response {
  id: string
  field_id: string
  user_id: string
  type: FieldType
  response: any
}
