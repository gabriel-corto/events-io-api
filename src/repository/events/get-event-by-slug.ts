import { prisma } from '../../lib/prisma.js'

interface GetEventBySlugRepositoryProps {
  slug: string
}
export async function getEventBySlugRepository({
  slug,
}: GetEventBySlugRepositoryProps) {
  const event = await prisma.events.findUnique({
    where: {
      slug,
    },
  })

  return event
}
