import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { getAccessToken } from '../../utils/getAccessToken'

export const spotifyRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next()
  })
  .query('getSongs', {
    input: z.object({
      searchParam: z.string().min(1),
    }),
    async resolve({ input }) {
      const { access_token } = await getAccessToken()
      const albums = await fetch(
        `https://api.spotify.com/v1/search?type=album&include_external=audio&limit=5&q=${input.searchParam}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return await albums.json()
    },
  })
