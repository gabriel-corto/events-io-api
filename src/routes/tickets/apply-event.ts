import { ApplyEventController } from '@/controllers/tickets/apply-event.js'
import { Router } from 'express'

export const applyEventRouter = Router()

applyEventRouter.post('/events/apply/:slug', ApplyEventController)
