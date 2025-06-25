import { Router } from 'express'
import { GetEventBySlugController } from '../../controllers/events/get-event-by-slug.js'

export const getEventBySlugRouter = Router()

getEventBySlugRouter.get('/events/:slug', GetEventBySlugController)
