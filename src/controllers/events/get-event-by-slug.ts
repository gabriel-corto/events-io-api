import { Request, Response } from 'express'
import { getEventBySlugRepository } from '../../repository/events/get-event-by-slug.js'

export async function GetEventBySlugController(req: Request, res: Response) {
  const { slug } = req.params

  if (!slug) {
    res.status(404).json({
      success: false,
      message: 'Forneça o slug do evento!',
    })

    return
  }

  try {
    const event = await getEventBySlugRepository({ slug })

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Evento não encontrado!',
      })

      return
    }

    res.status(200).json({
      success: true,
      content: event,
    })
  } catch {
    res.status(500).json({ message: 'Erro no servidor!' })
  }
}
