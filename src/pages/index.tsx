import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import AddAlbum from '../components/add-album'
import AlbumCard from '../components/album-card'
import Header from '../components/header'
import HTMLHead from '../components/html-head'
import { UserData } from '../types'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, isSuccess, isError, isLoading } = trpc.useQuery(['auth.getSession'])
  const { data: userAlbums } = trpc.useQuery(['userData.getAddedAlbums'])

  const {
    id,
    user: { image, name },
  } = (data as unknown as UserData) ?? { id: null, user: { image: null, name: null } }
  if (isSuccess && name) {
    return (
      <>
        <Header name={name} picture={image} />
        <AddAlbum />
        <div className='flex flex-row place-content-center'>
          <div className='grid gap-8 my-8 w-full max-w-lg md:max-w-5xl md:grid-cols-2'>
            {userAlbums &&
              userAlbums.length > 0 &&
              userAlbums
                .sort((a, b) => Number(b.date) - Number(a.date))
                .map((album) => (
                  <AlbumCard key={album.id} id={album.spotifyId} user={album.userId} />
                ))}
          </div>
        </div>
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
