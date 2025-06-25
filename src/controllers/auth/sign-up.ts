import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { signUpSchema } from '../../validators/sign-up.js'
import { signUpRepository } from '../../repository/auth/sign-up.js'
import { checkUserAlreadyExistRepository } from '../../repository/auth/user-already-exist.js'

export async function SignUpController(req: Request, res: Response) {
  const { name, email, password } = signUpSchema.parse(req.body)
  const userAlreadyExist = await checkUserAlreadyExistRepository({ email })

  if (userAlreadyExist) {
    res.status(409).json({
      success: false,
      message: 'Este e-mail já está sendo usado!',
    })

    return
  }

  try {
    await signUpRepository({ name, email, password })
    const authToken = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )

    res.cookie('authToken', authToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000,
    })

    res.status(201).json({ success: true })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro no servidor!',
    })
  }
}
