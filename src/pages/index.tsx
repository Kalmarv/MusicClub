import type { NextPage } from 'next'
import { signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Header from '../components/header'
import { Albums, Item, Root } from '../types'
import { trpc } from '../utils/trpc'

interface UserData {
  expires: string
  id: string
  user: {
    email: string
    image: string
    name: string
  }
}

const Home: NextPage = () => {
  const { data, isSuccess, isError, isLoading } = trpc.useQuery(['auth.getSession'])

  const {
    id,
    user: { image, name },
  } = (data as unknown as UserData) ?? { id: null, user: { image: null, name: null } }

  const spotifyToken = trpc.useQuery(['spotify.getSpotifyToken', { id: id }])
  const [search, setSearch] = useState<string>('')
  const [results, setResults] = useState<Item[]>()

  useEffect(() => {
    if (spotifyToken.isSuccess && search.length > 0) {
      fetch(
        `https://api.spotify.com/v1/search?type=album&include_external=audio&limit=5&q=${search}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken.data?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((v) => v.json())
        .then((v: Root) => setResults(v.albums.items))
    } else {
      setResults(undefined)
    }
  }, [search])

  if (isSuccess && name) {
    return (
      <>
        <Header name={name} picture={image} />
        <input type='text' onChange={(e) => setSearch(e.target.value)}></input>
        {results &&
          results.map((v) => (
            <div key={v.id} className='flex justify-between max-w-md'>
              <p>
                {v.name} - {v.artists.map((artist) => artist.name).join(', ')}
              </p>

              <img src={v?.images?.[0]?.url} width={100} height={100} />
            </div>
          ))}
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
