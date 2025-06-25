import { Request, Response } from 'express'

import { generateSlug } from '@/utils/slug-generator.js'
import { applyEventRepository } from '@/repository/tickets/apply-event.js'

import { getEventBySlugRepository } from '@/repository/events/get-event-by-slug.js'
import { ticketAlreadyExistRepository } from '@/repository/tickets/ticket-already-exist.js'

export async function ApplyEventController(req: Request, res: Response) {
  const event = await getEventBySlugRepository({ slug: req.params.slug })

  if (!event) {
    res.status(404).json({
      message: 'Evento não encontrado!',
    })

    return
  }

  const slug = 'ticket-' + generateSlug(event.title)
  const ticketAlreadyExist = await ticketAlreadyExistRepository({ slug })

  if (ticketAlreadyExist) {
    res.status(400).json({
      message: 'Voçê já se cadastrou nesse evento!',
    })

    return
  }

  const ticket = await applyEventRepository({ slug, eventId: event.id })
  res.status(200).json({
    content: ticket,
  })
}
