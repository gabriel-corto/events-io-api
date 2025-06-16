import { prisma } from '@/lib/prisma'
import { createEventsSchema } from '@/validators/create-events'
import { Router, Request, Response } from 'express'

export const createEventRouter = Router()

createEventRouter.post('/events', async (req: Request, res: Response) => {
  const { title, location } = createEventsSchema.parse(req.body)

  try {
    const events = await prisma.events.create({
      data: {
        title,
        location,
      },
    })

    res.json({
      success: true,
      content: events,
    })
  } catch {
    res.json({
      success: false,
      message: 'Error Fetching Events!',
    })
  }
})
