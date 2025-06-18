import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(4, 'Adcione um nome válido!'),
  email: z.string().email({ message: 'Adcione um e-mail válido!' }),
  password: z.string().min(6, 'Adcione uma senha válida!'),
})

export type SignUpData = z.infer<typeof signUpSchema>
