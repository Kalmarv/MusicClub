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
  const { data, isSuccess, isError, isLoading } = trpc.useQuery(['auth.getSession'])
  const { name, image, email } = (data?.user as UserData) ?? {}

  if (isSuccess && name) {
    return (
      <>
        Signed in as {name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  if (isLoading) {
    return (
      <div className='flex justify-center h-screen flex-col'>
        <h1 className='text-center font-bold text-2xl'>Loading ...</h1>
      </div>
    )
  }

  return (
    <div className='flex justify-center h-screen flex-col'>
      <h1 className='text-center font-bold text-2xl'>Music Club</h1>
      <button onClick={() => signIn('discord')} className='btn btn-primary place-self-center  m-8'>
        Sign in
      </button>
    </div>
  )
}

export default Home
