import { prisma } from '@/lib/prisma'
import { SignUpData } from '@/validators/sign-up'

export async function signUpRepository({ name, email, password }: SignUpData) {
  return await prisma.users.create({
    data: {
      email,
      name,
      password,
    },
  })
}
