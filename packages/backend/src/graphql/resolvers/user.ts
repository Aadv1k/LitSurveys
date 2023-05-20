import { CommonContext } from '../../types'
import { JWT_SECRET } from '../../const'
import { hasAuth, getAuth } from '../../utils'
import UserService from '../../services/UserService'

import jwt from 'jsonwebtoken'

interface ReturnUser {
  id: string
  username: string
  token?: string
}

async function getUser(
  _: any,
  { req, res }: CommonContext,
  __: any
): Promise<ReturnUser> {
  if (!hasAuth(req)) {
    throw new Error('Unauthorized')
  }

  let parsedToken: any
  try {
    const jwtToken = getAuth(req)?.[1]
    parsedToken = jwt.verify(jwtToken ?? '', JWT_SECRET)
  } catch {
    throw new Error('Unauthorized')
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
        id: foundUser.id
      },
      JWT_SECRET
    )
  }
}

export default {
  user: getUser
}
