import { Router } from 'express'
import { CreateEventController } from '@/controllers/create-event'

export const createEventRouter = Router()

createEventRouter.post('/events', CreateEventController)
