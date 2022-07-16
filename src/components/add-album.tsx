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

// import { useState, useEffect } from 'react'
// import { Item, Root, SpotifyError } from '../types'
// import { SpotifyToken, trpc } from '../utils/trpc'

// const fetchAlbums = async (token: SpotifyToken, search: string) => {
//   const albums = await fetch(
//     `https://api.spotify.com/v1/search?type=album&include_external=audio&limit=5&q=${search}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token?.access_token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )

//   const jsonAlbums: SpotifyError = await albums.json()
//   // console.log(jsonAlbums.error)

//   return jsonAlbums
// }

// const AddAlbum: React.FC<{ id: string }> = ({ id }) => {
//   const spotifyToken = trpc.useQuery(['spotify.getSpotifyToken', { id: id }])
//   const refresh = trpc.useQuery(['spotify.getRefreshToken', { id: id }])

//   const [search, setSearch] = useState<string>('')
//   const [results, setResults] = useState<Item[]>()
//   // spotifyToken.data?.access_token
//   //   useEffect(() => {
//   //     if (spotifyToken.isSuccess && search.length > 0) {

//   //         .then((v) => v.json())
//   //         .then((v: Root) => setResults(v.albums.items))
//   //     } else {
//   //       setResults(undefined)
//   //     }
//   //   }, [search])

//   console.log(fetchAlbums(spotifyToken.data as SpotifyToken, search))

//   return (
//     <>
//       <label htmlFor='my-modal' className='btn btn-secondary'>
//         Add Album
//       </label>
//       <input type='checkbox' id='my-modal' className='modal-toggle' />
//       <div className='modal'>
//         <div className='modal-box'>
//           <h3 className='font-bold text-lg'>Seach for Album</h3>
//           <p className='py-4'>
//             {
//               "You've been selected for a chance to get one year of subscription to use Wikipedia for free!"
//             }
//           </p>
//           <div className='modal-action'>
//             <label htmlFor='my-modal' className='btn'>
//               Add
//             </label>
//           </div>
//         </div>
//       </div>
//       <input type='text' onChange={(e) => setSearch(e.target.value)}></input>
//       {results &&
//         results.map((v) => (
//           <div key={v.id} className='flex justify-between max-w-md'>
//             <p>
//               {v.name} - {v.artists.map((artist) => artist.name).join(', ')}
//             </p>

//             <img src={v?.images?.[0]?.url} width={100} height={100} />
//           </div>
//         ))}
//     </>
//   )
// }

// export default AddAlbum
