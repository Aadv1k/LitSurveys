import Express from 'express'
import { ApiError } from './const'
import { customAlphabet } from 'nanoid'

export function sendErrorResponse(res: Express.Response, error: ApiError) {
  res.status(error.status)
  res.json(error)
}

export function sendJSONResponse(
  res: Express.Response,
  obj: any,
  status?: number
) {
  res.status(obj.status ?? status ?? 200)
  res.json(obj)
}

export function hasAuth(req: Express.Request): boolean {
  const auth = req.headers['authorization']
  if (!auth) return false
  if (auth.split(' ').length !== 2) return false
  return true
}

export function getAuth(req: Express.Request): [string, string] | null {
  const auth = req?.headers['authorization']?.split(' ')
  return auth ? [auth[0], auth[1]] : null
}

export function nanoid(): string {
  const urlFriendlyChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-'
  const idLength = 12
  const generateUrlFriendlyId = customAlphabet(urlFriendlyChars, idLength)
  const id = generateUrlFriendlyId()
  return id
}
