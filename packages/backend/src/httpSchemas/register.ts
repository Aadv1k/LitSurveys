const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    type: { enum: ['Admin', 'User'] },
  },
  required: ['username', 'email', 'password', 'type'],
}

export default schema;
