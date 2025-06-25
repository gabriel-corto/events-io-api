import { prisma } from '../../lib/prisma.js'

interface DeleteEventRepositoryProps {
  slug: string
}
export async function deleteEventRepository({
  slug,
}: DeleteEventRepositoryProps) {
  await prisma.events.delete({
    where: {
      slug,
    },
  })
}
