import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token

  if (!token || token !== api_TOKEN) {
    return res.status(403).send({ message: "Only the Menhera Client can acess that!" })
  }

  next()
}