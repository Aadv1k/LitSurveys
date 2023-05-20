import { CommonContext } from '../../types'
import { JWT_SECRET } from '../../const'
import UserService from '../../services/UserService'

import jwt from 'jsonwebtoken'

interface ReturnUser {
  id: string,
  username: string
  token?: string
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

  const foundUser = await UserService.getUserById(parsedToken.id ?? '')

  if (!foundUser) {
    throw new Error('User not found') // TODO: Make this a proper error
  }

  return {
    username: foundUser.username,
    id: foundUser.id,
    token: jwt.sign(
      {
        username: foundUser.username,
        id: foundUser.id,
      },
      JWT_SECRET
    )
  }
}

export default {
  user: getUser
}
