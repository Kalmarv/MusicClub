import { LegacyRef, RefObject, useEffect, useRef, useState } from 'react'
import { AlbumItem, Albums } from '../types'
import { trpc } from '../utils/trpc'
import Image from 'next/image'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Hook - https://usehooks.com/useKeyPress/
const useKeyPress = (targetKey: string): boolean => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)
  // If pressed key is our target key then set to true
  function downHandler({ key }: { key: any }): void {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: { key: any }): void => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return keyPressed
}

const AddAlbum = () => {
  const { invalidateQueries } = trpc.useContext()
  const [albums, setAlbums] = useState<AlbumItem[]>()
  const [tracks, setAlbumTracks] = useState<string[]>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [animationParent] = useAutoAnimate()
  const escapePressed = useKeyPress('Escape')

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
    const tracks = trackListing.tracks.items.map((t: any) => ({
      id: t.id,
      name: t.name,
    }))
    addAlbumToDb.mutate({ spotifyId: album.id, tracks: tracks })
    setModalIsOpen(false)
  }

  useEffect(() => {
    if (escapePressed) {
      setModalIsOpen(false)
    }
  }, [escapePressed])

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
          <div ref={animationParent as LegacyRef<HTMLDivElement>}>
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
          </div>
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
