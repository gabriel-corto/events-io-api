import { prisma } from '@/lib/prisma.js'

interface TicketAlreadyExistRepository {
  slug: string
}

export async function ticketAlreadyExistRepository({
  slug,
}: TicketAlreadyExistRepository) {
  const ticket = await prisma.tickets.findFirst({
    where: {
      slug,
    },
  })

  return ticket
}
