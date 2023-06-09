const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  anyOf: [
    {
      required: ['username']
    },
    {
      required: ['password']
    }
  ],
  additionalProperties: false
}

export default schema
