export enum FieldType {
  multiSelect = 'multi-select',
  likertSelect = 'likert-select',
  any = 'any'
}

export interface Field {
  id: string
  survey_id: string
  user_id: string
  type: FieldType
  question: string
  response_options?: Array<string>
}
