import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.authToken

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'UNAUTHORIZED',
    })

    console.log(token)

    return
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
    email: string
  }

  next()
}
