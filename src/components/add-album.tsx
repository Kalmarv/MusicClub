import { trpc } from '../utils/trpc'

const AddAlbum = () => {
  const albumResults = trpc.useQuery(['spotify.getSongs', { searchParam: 'Frank Ocean' }])

  return <p>{JSON.stringify(albumResults.data)}</p>
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
