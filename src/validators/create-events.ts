import { z } from 'zod'

export const createEventsSchema = z.object({
  title: z.string().min(1, 'Add a valid event title'),
  location: z.string().min(1, 'Add a valid event location'),
})

export type EventData = z.infer<typeof createEventsSchema>
