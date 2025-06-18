import { Request, Response } from 'express'

import { prisma } from '@/lib/prisma'
import { signUpSchema } from '@/validators/sign-up'
import { signUpRepository } from '@/repository/auth'

export async function SignUpController(req: Request, res: Response) {
  const { name, email, password } = signUpSchema.parse(req.body)

  const userAlreadyExist = await prisma.users.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExist) {
    res.status(409).json({
      success: false,
      message: 'Este e-mail Já está sendo usado!',
    })

    return
  }

  try {
    await signUpRepository({ name, email, password })

    res.status(201).json({
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro no servidor!',
    })
  }
}
