import { Router } from 'express'
import { GetEventController } from '@/controllers/get-events'

export const getEventsRouter = Router()

getEventsRouter.get('/events', GetEventController)
