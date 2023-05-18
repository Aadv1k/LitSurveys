const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    type: { enum: ['surveyor', 'surveyee', "any"] },
  },
  required: ['username', 'email', 'password', 'type'],
}

export default schema;
