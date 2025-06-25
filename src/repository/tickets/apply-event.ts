import { prisma } from '@/lib/prisma.js'

interface ApplyEventRepository {
  slug: string
  eventId: number
}
export async function applyEventRepository({
  eventId,
  slug,
}: ApplyEventRepository) {
  const ticket = await prisma.tickets.create({
    data: {
      slug,
      eventsId: eventId,
    },
  })

  return ticket
}
