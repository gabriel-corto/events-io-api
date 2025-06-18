import { Router } from 'express'
import { SignUpController } from '@/controllers/auth/sign-up'

export const signUpRouter = Router()

signUpRouter.post('/auth/sign-up', SignUpController)
