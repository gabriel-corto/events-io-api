import express, { json, NextFunction, Request, Response } from 'express'
import 'dotenv/config'

import { getEventsRouter } from './routes/get-events'
import { createEventRouter } from './routes/create-event'
import { getEventBySlugRouter } from './routes/get-event-by-slug'

import { AppError } from './exceptions/app-errors'
import { deleteEventRouter } from './routes/delete-event'

const server = express()
server.use(json())

server.use(
  createEventRouter,
  getEventsRouter,
  getEventBySlugRouter,
  deleteEventRouter,
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

    res.status(500).json({
      message: error.message,
    })

    next()
  },
)

server.listen(process.env.PORT, () => {
  console.log('🔥 HTTP server running!')
})
