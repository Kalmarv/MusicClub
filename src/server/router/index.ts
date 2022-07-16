// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { spotifyRouter } from './spotify'
import { authRouter } from './auth'
import { userDataRouter } from './userData'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('spotify.', spotifyRouter)
  .merge('auth.', authRouter)
  .merge('userData.', userDataRouter)

// export type definition of API
export type AppRouter = typeof appRouter
