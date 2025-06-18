import { Router } from 'express'
import { DeleteEventController } from '@/controllers/events/delete-event'

export const deleteEventRouter = Router()

deleteEventRouter.delete('/events/:slug', DeleteEventController)
