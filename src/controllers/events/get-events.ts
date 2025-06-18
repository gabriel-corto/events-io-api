import { Request, Response } from 'express'
import { prisma } from '@/lib/prisma'

export async function GetEventController(req: Request, res: Response) {
  const events = await prisma.events.findMany()

  if (!events || events.length === 0) {
    res.status(404).json({
      success: false,
      message: 'No events found.',
    })
  }

  res.status(200).json({
    success: true,
    content: events,
  })
}
