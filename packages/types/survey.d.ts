export enum SurveyStatus {
  active = 'active',
  closed = 'closed'
}

export interface Survey {
  id: string
  user_id: string
  created_at: number
  title: string
  description: string
  status: SurveyStatus
  max_responses: number
}
