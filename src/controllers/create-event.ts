import { Request, Response } from 'express'
import { generateSlug } from '@/utils/slug-generator'

import { createEventsSchema } from '@/validators/create-events'
import { createEventRepository } from '@/repository/events'

export async function CreateEventController(req: Request, res: Response) {
  const { title, location, ticket } = createEventsSchema.parse(req.body)
  const slug = generateSlug(title)

  if (!slug) {
    res.status(400).json({
      success: false,
      message: 'Invalid Slug.',
    })
  }

  try {
    const events = await createEventRepository({ title, location, ticket })

    res.status(201).json({
      success: true,
      content: events,
    })
  } catch {
    res.status(404).json({
      success: false,
      message: 'Error Fetching Events!',
    })
  }
}
