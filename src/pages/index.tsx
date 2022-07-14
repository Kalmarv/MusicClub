import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  const { data: session } = useSession()
  if (session?.user?.email) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('discord')}>Sign in</button>
    </>
  )
}

export default Home
