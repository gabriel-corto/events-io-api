import { prisma } from '@/lib/prisma'
import { Request, Response } from 'express'

export async function GetEventBySlugController(req: Request, res: Response) {
  const { slug } = req.params

  if (!slug) {
    res.status(404).json({
      success: false,
      message: 'Slug is required!',
    })
  }

  try {
    const event = await prisma.events.findUnique({
      where: {
        slug,
      },
    })

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    res.status(200).json({
      success: true,
      content: event,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
