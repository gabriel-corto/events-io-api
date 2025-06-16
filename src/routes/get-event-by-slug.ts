import { Router } from 'express'
import { GetEventBySlugController } from '@/controllers/get-event-by-slug'

export const getEventBySlugRouter = Router()

getEventBySlugRouter.get('/events/:slug', GetEventBySlugController)
