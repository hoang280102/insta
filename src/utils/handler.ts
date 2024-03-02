import { NextFunction, Request, RequestHandler, Response } from 'express'

export const handlerError = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next)
    } catch (error) {
      next(func)
    }
  }
}
