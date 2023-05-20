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

export function nanoid(): string {
  const urlFriendlyChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-'
  const idLength = 12
  const generateUrlFriendlyId = customAlphabet(urlFriendlyChars, idLength)
  const id = generateUrlFriendlyId()
  return id
}
