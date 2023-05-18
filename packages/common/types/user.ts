export enum UserType {
  surveyor = 'surveyor',
  surveyee = 'surveyee',
  any = 'any'
}

export interface User {
  id: string
  username: string
  email: string
  password: string
  type: UserType
}
