import { Request, Response } from 'express'

import { prisma } from '@/lib/prisma'
import { signInSchema } from '@/validators/sign-in'

export async function SignInController(req: Request, res: Response) {
  const { email, password } = signInSchema.parse(req.body)

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'Ops! Conta Não Encontrada.',
    })
  }

  if (user.email === email && user.password === password) {
    res.status(201).json({
      success: true,
      content: user.email,
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Credencias Inválidas!',
    })
  }

  res.status(500).json({
    success: false,
    message: 'Erro no servidor!',
  })
}
