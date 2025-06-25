import { prisma } from '../../lib/prisma.js'

interface CheckUserAlreadyExistProps {
  email: string
}
export async function checkUserAlreadyExistRepository({
  email,
}: CheckUserAlreadyExistProps) {
  const userAlreadyExist = await prisma.users.findUnique({
    where: {
      email,
    },
  })

  return userAlreadyExist
}
