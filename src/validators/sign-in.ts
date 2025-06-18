import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Adcione um e-mail válido!' }),
  password: z.string().min(6, 'Adcione uma senha válida!'),
})

export type SignInData = z.infer<typeof signInSchema>
