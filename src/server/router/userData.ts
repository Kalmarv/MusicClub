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
  .query('getAlbumSongs', {
    input: z.object({
      albumId: z.string(),
    }),
    async resolve({ ctx: { prisma }, input }) {
      return await prisma.album.findUnique({
        where: { spotifyId: input.albumId },
        select: {
          tracks: { select: { name: true, albumId: true, id: true, spotifyID: true, fav: true } },
        },
      })
    },
  })
  .mutation('favoriteTrack', {
    input: z.object({
      trackId: z.string(),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      return await prisma.user.update({
        where: { id: session?.id as string },
        data: {
          favTracks: {
            connect: {
              id: input.trackId,
            },
          },
        },
      })
    },
  })
  .mutation('unFavoriteTrack', {
    input: z.object({
      trackId: z.string(),
    }),
    async resolve({ ctx: { prisma, session }, input }) {
      return await prisma.user.update({
        where: { id: session?.id as string },
        data: {
          favTracks: {
            disconnect: {
              id: input.trackId,
            },
          },
        },
      })
    },
  })
