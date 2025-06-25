import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express, { json, NextFunction, Request, Response } from 'express'

import { getEventBySlugRouter } from './routes/events/get-event-by-slug.js'
import { getEventsRouter } from './routes/events/get-events.js'
import { createEventRouter } from './routes/events/create-event.js'
import { deleteEventRouter } from './routes/events/delete-event.js'

import { applyEventRouter } from './routes/tickets/apply-event.js'
import { getTicketsRouter } from './routes/tickets/get-tickets.js'

import { signInRouter } from './routes/auth/sign-in.js'
import { signUpRouter } from './routes/auth/sign-up.js'

import { ZodError } from 'zod'
import { AppError } from './exceptions/app-errors.js'

const server = express()

server.use(json())
server.use(cookieParser())
server.use(express.static('uploads'))

server.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
)

server.use(
  createEventRouter,
  getEventsRouter,
  getEventBySlugRouter,
  deleteEventRouter,

  applyEventRouter,
  getTicketsRouter,

  signUpRouter,
  signInRouter,
)

server.use(
  (
    error: {
      status: number
      message: string
    },
    _req: Request,
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
