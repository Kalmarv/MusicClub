import NextAuth, { type NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
import { env } from '../../../server/env'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      // authorization:
      //   'https://accounts.spotify.com/authorize?scope=user-read-email+user-read-recently-played+user-read-playback-position+user-read-playback-state+user-read-currently-playing',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return { ...session, id: user.id }
    },
  },
  debug: true,
}

export default NextAuth(authOptions)
