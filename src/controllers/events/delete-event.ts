import { deleteEventRepository } from '../../repository/events/delete-event.js'
import { getEventBySlugRepository } from '../../repository/events/get-event-by-slug.js'
import { Request, Response } from 'express'

export async function DeleteEventController(req: Request, res: Response) {
  const { slug } = req.params

  if (!slug) {
    res.status(400).json({
      success: false,
      message: 'Adcione um slug!',
    })
  }

  const event = await getEventBySlugRepository({ slug })

  if (!event) {
    res.status(404).json({ message: 'Evento não encontrado!' })

    return
  }

  try {
    await deleteEventRepository({ slug })

    res.status(200).json({
      success: true,
      content: null,
      message: 'Evento eliminado com sucesso!',
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor!' })
  }
}
