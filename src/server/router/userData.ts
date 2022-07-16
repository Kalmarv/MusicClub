import { createRouter } from './context'
import { z } from 'zod'

export const userDataRouter = createRouter()
  .query('getAddedAlbums', {
    async resolve({ ctx: { prisma } }) {
      return await prisma.album.findMany()
    },
  })
  .query('profile', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx: { prisma }, input }) {
      return await prisma.user.findUnique({
        where: { id: input.userId },
      })
    },
  })
