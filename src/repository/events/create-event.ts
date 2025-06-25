import { prisma } from '../../lib/prisma.js'

import { generateSlug } from '../../utils/slug-generator.js'
import { EventData } from '../../validators/create-events.js'

export async function createEventRepository({
  title,
  location,
  ticket,
  cover,
}: EventData) {
  const slug = generateSlug(title)

  return await prisma.events.create({
    data: {
      title,
      location,
      slug,
      ticket,
      cover,
    },
  })
}
