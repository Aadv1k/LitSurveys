const userSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    type: { enum: ['Admin', 'User'] },
  },
  required: 
