import { Request, Response } from 'express'
import { getEventsRepository } from '../../repository/events/get-events.js'

export async function GetEventController(req: Request, res: Response) {
  try {
    const events = await getEventsRepository()

    if (!events || events.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No events founded!',
      })

      return
    }

    res.status(200).json({
      success: true,
      content: events,
    })
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error!',
    })
  }
}
