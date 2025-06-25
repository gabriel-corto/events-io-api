import { prisma } from '../../lib/prisma.js'
import { SignUpData } from '../../validators/sign-up.js'

export async function signUpRepository({ name, email, password }: SignUpData) {
  await prisma.users.create({
    data: {
      email,
      name,
      password,
    },
  })
}
