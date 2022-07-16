import { useState } from 'react'
import { AlbumItem, Albums } from '../types'
import { trpc } from '../utils/trpc'
import Image from 'next/image'

const AddAlbum = () => {
  const { invalidateQueries } = trpc.useContext()
  const [albums, setAlbums] = useState<AlbumItem[]>()

  const albumResults = trpc.useMutation(['spotify.getSongs'], {
    onSuccess: (data) => setAlbums(data.albums.items),
  })

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length < 1) {
      // so it clears the results
      setAlbums(undefined)
      return
    }
    albumResults.mutate({ searchParam: value })
  }

  return (
    <>
      <label htmlFor='my-modal' className='btn btn-secondary mx-4'>
        Add Album
      </label>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Seach for Album</h3>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered border-2 input-secondary w-full mt-4'
            onChange={(e) => handleInput(e)}></input>
          <div className='mt-4' />
          {albums &&
            albums.length > 0 &&
            albums.map((albums) => (
              <div
                key={albums.id}
                className='flex flex-row w-full h-20 rounded text-primary-content place-content-start mt-4'>
                <div className='relative aspect-square'>
                  <Image
                    src={albums.images[1]?.url as string}
                    alt='album cover'
                    className='rounded'
                    layout='fill'
                  />
                </div>
                <div className='mx-2'>
                  <h1 className='font-bold'>{albums.name}</h1>
                  <h2>{albums.artists.map((artist) => artist.name).join(', ')}</h2>
                </div>
              </div>
            ))}
          <div className='modal-action'>
            <label htmlFor='my-modal' className='btn btn-primary'>
              close
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAlbum
