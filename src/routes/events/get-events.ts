import { Router } from 'express'
import { GetEventController } from '../../controllers/events/get-events.js'
import { verifyAuth } from '@/middlewares/verify-auth.js'

export const getEventsRouter = Router()

getEventsRouter.get('/events', verifyAuth, GetEventController)
