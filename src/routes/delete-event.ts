import { Router } from 'express'
import { DeleteEventController } from '@/controllers/delete-event'

export const deleteEventRouter = Router()

deleteEventRouter.delete('/events/:slug', DeleteEventController)
