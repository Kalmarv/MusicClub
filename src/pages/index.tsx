import type { NextPage } from 'next'
import { signIn, signOut } from 'next-auth/react'
import { trpc } from '../utils/trpc'

interface UserData {
  email: string
  image: string
  name: string
}

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  const { data, isSuccess, isError } = trpc.useQuery(['auth.getSession'])
  const { name, image, email } = data?.user as UserData

  if (isSuccess) {
    return (
      <>
        Signed in as {name} <br />
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
