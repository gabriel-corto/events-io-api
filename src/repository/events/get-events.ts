import { prisma } from '../../lib/prisma.js'

export async function getEventsRepository() {
  const events = await prisma.events.findMany()
  return events
}
