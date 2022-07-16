import { useState } from 'react'
import { AlbumItem, Albums } from '../types'
import { trpc } from '../utils/trpc'
import Image from 'next/image'

const AddAlbum = () => {
  const { invalidateQueries } = trpc.useContext()
  const [albums, setAlbums] = useState<AlbumItem[]>()
  const [tracks, setAlbumTracks] = useState<string[]>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const addAlbumToDb = trpc.useMutation(['spotify.addAlbum'], {
    onSuccess: () => invalidateQueries(['userData.getAddedAlbums']),
  })

  const albumResults = trpc.useMutation(['spotify.getSongs'], {
    onSuccess: (data) => setAlbums(data.albums.items),
  })

  const albumTracks = trpc.useMutation(['spotify.getAlbumMutation'], {
    onSuccess: (data) => setAlbumTracks(data.tracks.items.map((t: any) => t.id)),
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

  const addAlbum = async (album: AlbumItem) => {
    const trackListing = await albumTracks.mutateAsync({ id: album.id })
    const tracks = trackListing.tracks.items.map((t: any) => t.id)
    console.log(tracks)
    addAlbumToDb.mutate({ spotifyId: album.id, tracks: tracks })
    setModalIsOpen(false)
  }

  return (
    <>
      <label htmlFor='my-modal' className='btn btn-secondary mx-8'>
        Add Album
      </label>
      <input
        type='checkbox'
        id='my-modal'
        className='modal-toggle'
        checked={modalIsOpen}
        onClick={() => setModalIsOpen(true)}
      />
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
                className='flex flex-row w-full h-20 rounded text-primary-content justify-between mt-4'>
                <div className='relative aspect-square'>
                  <Image
                    src={albums.images[1]?.url as string}
                    alt='album cover'
                    className='rounded'
                    layout='fill'
                  />
                </div>
                <div className='mx-4 mt-2 w-full'>
                  <h1 className='font-bold'>{albums.name}</h1>
                  <h2>{albums.artists.map((artist) => artist.name).join(', ')}</h2>
                </div>
                <button
                  className='btn btn-sm rounded-full btn-secondary place-self-center'
                  onClick={() => addAlbum(albums)}>
                  Add
                </button>
              </div>
            ))}
          <div className='modal-action'>
            <button className='btn btn-primary' onClick={() => setModalIsOpen(false)}>
              close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAlbum
