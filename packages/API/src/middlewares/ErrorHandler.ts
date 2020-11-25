import { Request, Response, NextFunction } from 'express'
import APIError from '../util/APIError'

export default (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return next()
  }

  if (error instanceof APIError) {
    return res.status(error.status).send({ message: error.message })
  }

  console.error(error)
  return res.status(500).send({ message: 'An error occurred trying to process your request' })
}