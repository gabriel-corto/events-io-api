import { prisma } from '@/lib/prisma'

import { generateSlug } from '@/utils/slug-generator'
import { EventData } from '@/validators/create-events'

export async function createEventRepository({
  title,
  location,
  ticket,
}: EventData) {
  const slug = generateSlug(title)

  return await prisma.events.create({
    data: {
      title,
      location,
      slug,
      ticket,
    },
  })
}
