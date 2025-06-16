import { prisma } from '@/lib/prisma'
import { Request, Response } from 'express'

export async function DeleteEventController(req: Request, res: Response) {
  const { slug } = req.params

  if (!slug) {
    res.status(400).json({
      success: false,
      message: 'Slug is required',
    })
  }

  try {
    await prisma.events.delete({
      where: {
        slug,
      },
    })

    res.status(200).json({
      success: true,
      content: null,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
