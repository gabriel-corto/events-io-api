import { Router } from 'express'
import { SignInController } from '@/controllers/auth/sign-in'

export const signInRouter = Router()

signInRouter.post('/auth/sign-in', SignInController)
