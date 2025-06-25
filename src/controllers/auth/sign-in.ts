import { Request, Response } from 'express'

import { signInSchema } from '../../validators/sign-in.js'
import { signInRepository } from '../../repository/auth/sign-in.js'

export async function SignInController(req: Request, res: Response) {
  const { email, password } = signInSchema.parse(req.body)
  const user = await signInRepository({ email })

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'Ops! Conta Não Encontrada.',
    })
  }

  if (user.email === email && user.password === password) {
    res.status(200).json({
      success: true,
      user,
      message: 'Login efectuado com sucesso!',
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
