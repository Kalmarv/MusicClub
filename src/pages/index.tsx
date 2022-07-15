import type { NextPage } from 'next'
import { signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AddAlbum from '../components/addA-album'
import Header from '../components/header'
import { Albums, Item, Root, UserData } from '../types'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, isSuccess, isError, isLoading } = trpc.useQuery(['auth.getSession'])

  const {
    id,
    user: { image, name },
  } = (data as unknown as UserData) ?? { id: null, user: { image: null, name: null } }
  if (isSuccess && name) {
    return (
      <>
        <Header name={name} picture={image} />
        <AddAlbum id={id} />
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
