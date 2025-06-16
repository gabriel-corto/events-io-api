import { prisma } from '@/lib/prisma'
import { Router, Request, Response } from 'express'

export const getEventsRouter = Router()

getEventsRouter.get('/events', async (req: Request, res: Response) => {
  const events = await prisma.events.findMany()

  res.status(200).json({
    success: true,
    content: events,
  })
})
