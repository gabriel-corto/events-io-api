import { Router } from 'express'
import { upload } from '../../config/multer.js'

import { CreateEventController } from '../../controllers/events/create-event.js'

export const createEventRouter = Router()

createEventRouter.post('/events', upload.single('cover'), CreateEventController)
