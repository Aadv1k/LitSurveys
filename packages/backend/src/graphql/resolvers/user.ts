import { User, UserType } from '@litsurvey/common'
import { CommonContext } from '../../types'
import { JWT_SECRET } from '../../const'
import UserService from '../../services/UserService'

import jwt from 'jsonwebtoken'

interface ReturnUser {
  email: string
  username: string
  token?: string
}

async function createUser(input: {input: User}, args: User, __: any): Promise<ReturnUser> {
  const data = input.input as User;
  if (data.type !== 'surveyor' && data.type !== 'surveyee') {
    throw new Error('Invalid user type')
  }

  const userToCreate = {
    id: 'random',
    username: data.username,
    email: data.email,
    password: data.password,
    type: data.type
  } as User


  const foundUser = await UserService.getUserByEmail(userToCreate.email)

  if (foundUser) {
    throw new Error("User already exists!");
  }

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
  args: CommonContext,
  __: any
): Promise<ReturnUser> {
  const token = args.req.headers?.authorization



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
