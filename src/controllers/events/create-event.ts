import { Request, Response } from 'express'
import { createEventSchema, EventData } from '@/validators/create-events'
import { createEventRepository } from '@/repository/events'

export async function CreateEventController(req: Request, res: Response) {
  const parsedBody: EventData = {
    ...req.body,
    ticket: req.body.ticket ? Number(req.body.ticket) : undefined,
  }

  const validated = createEventSchema.safeParse(parsedBody)

  if (!validated.success) {
    res.status(400).json({
      success: false,
      message: validated.error.issues.map((issue) => issue.message).join(', '),
    })

    return
  }

  const { title, location, ticket } = validated.data
  const cover = req.file?.path

  try {
    const events = await createEventRepository({
      title,
      location,
      ticket,
      cover,
    })

    res.status(201).json({
      success: true,
      content: events,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar evento!',
    })
  }
}
