import { GetTicketsController } from '@/controllers/tickets/get-tickets.js'
import { Router } from 'express'

export const getTicketsRouter = Router()

getTicketsRouter.get('/tickets', GetTicketsController)
