import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const spotifyRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next()
  })
  .query('getSpotifyToken', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      return await prisma.account.findFirst({
        where: { userId: input.id },
        select: {
          id: true,
          scope: true,
          providerAccountId: true,
          refresh_token: true,
          access_token: true,
        },
      })
    },
  })
