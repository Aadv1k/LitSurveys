import { User, UserType } from '@common/user'
import { CommonContext } from '../../types'
import { JWT_SECRET } from '../../const'
import UserService from '../../services/UserService'

import jwt from 'jsonwebtoken'

interface ReturnUser {
  email: string
  username: string
  token?: string
}

async function createUser(_: any, args: User, __: any): Promise<ReturnUser> {
  if (args.type !== 'surveyor' && args.type !== 'surveyee') {
    throw new Error('Invalid user type')
  }

  const userToCreate = {
    id: 'random',
    username: args.username,
    email: args.email,
    password: args.password,
    type: args.type
  } as User

  const createdUser = await UserService.createUser(userToCreate)

  if (!createdUser) {
    throw new Error('Failed to create user')
  }

  return {
    username: createdUser.username,
    email: createdUser.email,
    token: jwt.sign(
      {
        username: createdUser.username,
        email: createdUser.email
      },
      JWT_SECRET
    )
  }
}

async function getUser(
  _: any,
  args: User,
  context: CommonContext
): Promise<ReturnUser> {
  const token = context.req.headers?.authorization

  if (!token) {
    throw new Error('Unauthorized') // TODO: Make this a proper error
  }

  let parsedToken: any
  try {
    parsedToken = jwt.verify(token, JWT_SECRET)
  } catch {
    throw new Error('Invalid token') // TODO: Make this a proper error
  }

  const foundUser = await UserService.getUserByEmail(parsedToken.email ?? '')

  if (!foundUser) {
    throw new Error('User not found') // TODO: Make this a proper error
  }

  return {
    username: foundUser.username,
    email: foundUser.email,
    token: jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email
      },
      JWT_SECRET
    )
  }
}

export default {
  createUser: createUser,
  user: getUser
}
