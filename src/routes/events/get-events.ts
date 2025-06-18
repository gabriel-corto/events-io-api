import { Router } from 'express'
import { GetEventController } from '@/controllers/events/get-events'

export const getEventsRouter = Router()

getEventsRouter.get('/events', GetEventController)
