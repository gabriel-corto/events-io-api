import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(1, 'Adcione um título para o evento!'),
  ticket: z.number().min(1, 'Adcione um valor válido para o ticket!'),
  location: z.string().min(1, 'Adcione uma localização para o evento!'),

  date: z.coerce
    .date({ message: 'Adcione uma data válida para o evento!' })
    .refine((d) => d > new Date(), {
      message: 'A data do evento deve ser no futuro!',
    })
    .optional(),

  cover: z.string().url().optional(),
})

export type EventData = z.infer<typeof createEventSchema>
