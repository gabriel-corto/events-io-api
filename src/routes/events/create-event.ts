import { Router } from 'express'
import { upload } from '@/config/multer'

import { CreateEventController } from '@/controllers/events/create-event'

export const createEventRouter = Router()

createEventRouter.post('/events', upload.single('cover'), CreateEventController)
