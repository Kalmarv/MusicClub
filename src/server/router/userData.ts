import { createRouter } from './context'
import { z } from 'zod'

export const userDataRouter = createRouter().query('getAddedAlbums', {
  async resolve({ ctx: { prisma } }) {
    return await prisma.album.findMany()
  },
})
