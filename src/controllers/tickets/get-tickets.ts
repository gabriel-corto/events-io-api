import { prisma } from '@/lib/prisma.js'
import { Request, Response } from 'express'

export async function GetTicketsController(req: Request, res: Response) {
  const tickets = await prisma.tickets.findMany({
    include: {
      event: true,
    },
  })

  res.json({
    tickets,
  })
}
