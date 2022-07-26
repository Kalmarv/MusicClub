import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { getAccessToken } from '../../utils/getAccessToken'

export const spotifyRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next()
  })
  .mutation('getSongs', {
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
  .query('getAlbum', {
    input: z.object({
      id: z.string().min(1),
    }),
    async resolve({ input }) {
      const { access_token } = await getAccessToken()
      const album = await fetch(`https://api.spotify.com/v1/albums/${input.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      return await album.json()
    },
  })
  .mutation('getAlbumMutation', {
    input: z.object({
      id: z.string().min(1),
    }),
    async resolve({ input }) {
      const { access_token } = await getAccessToken()
      const album = await fetch(`https://api.spotify.com/v1/albums/${input.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      return await album.json()
    },
  })
  .mutation('addAlbum', {
    input: z.object({
      spotifyId: z.string().min(1),
      tracks: z
        .array(
          z.object({
            id: z.string().min(1),
            name: z.string().min(1),
          })
        )
        .min(1),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      const trackData = input.tracks.map((track) => ({
        spotifyID: track.id,
        name: track.name,
      }))

      await prisma.album.create({
        data: {
          spotifyId: input.spotifyId,
          userId: session?.id as string,
          tracks: {
            createMany: {
              data: [...trackData],
            },
          },
        },
      })

      return
    },
  })
