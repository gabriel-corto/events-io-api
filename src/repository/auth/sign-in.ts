import { prisma } from '../../lib/prisma.js'

interface SignInRepositoryProps {
  email: string
}
export async function signInRepository({ email }: SignInRepositoryProps) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  })

  return user
}
