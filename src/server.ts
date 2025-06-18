import 'dotenv/config'
import express, { json, NextFunction, Request, Response } from 'express'

import { getEventsRouter } from './routes/events/get-events'
import { getEventBySlugRouter } from './routes/events/get-event-by-slug'

import { deleteEventRouter } from './routes/events/delete-event'
import { createEventRouter } from './routes/events/create-event'

import { AppError } from './exceptions/app-errors'
import { signUpRouter } from './routes/auth/sign-up'
import { ZodError } from 'zod'
import { signInRouter } from './routes/auth/sign-in'

const server = express()
server.use(json())

server.use(
  createEventRouter,
  getEventsRouter,
  getEventBySlugRouter,
  deleteEventRouter,

  signUpRouter,
  signInRouter,
)

server.use(
  (
    error: {
      status: number
      message: string
    },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      res.status(error.status).json({
        message: error.message[0],
      })
    }

    if (error instanceof ZodError) {
      res.status(400).json({
        message: error.issues.map((err) => err.message),
      })
    }

    res.status(500).json({
      message: error.message,
    })

    next()
  },
)

server.listen(process.env.PORT, () => {
  console.log('🔥 HTTP server running!')
})
