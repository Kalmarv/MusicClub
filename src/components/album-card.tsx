import Image from 'next/image'
import { AlbumTrack } from '../types'
import { trpc } from '../utils/trpc'

const AlbumCard: React.FC<{ id: string; user: string }> = ({ id, user }) => {
  const { data: albumData, isSuccess: albumIsSuccess } = trpc.useQuery(['spotify.getAlbum', { id }])
  const { data: songData, isSuccess: songIsSuccess } = trpc.useQuery([
    'userData.getAlbumSongs',
    { albumId: id },
  ])

  console.log(songData)

  const { data: userData, isSuccess: userIsSuccess } = trpc.useQuery([
    'userData.profile',
    { userId: user },
  ])

  return (
    <>
      {albumIsSuccess && userIsSuccess && (
        <div className='flex flex-col place-items-start px-8'>
          <div className='relative aspect-square w-full max-w-md place-self-center'>
            <a href={albumData.uri}>
              <Image
                src={albumData.images[0].url}
                alt={albumData.name}
                layout='fill'
                className='rounded-lg'
              />
            </a>
          </div>
          <div className='mt-4' />
          <div className='flex flex-row place-content-between w-full'>
            <div>
              <h1 className='font-bold text-2xl'>{albumData.name}</h1>
              <h2 className='text-2xl'>
                {albumData.artists.map((artist: any) => artist.name).join(', ')}
              </h2>
            </div>
            <div className='w-14 h-14 m-2'>
              <div className='relative aspect-square'>
                <Image
                  src={(userData?.image as string) ?? '/profile-placeholder.png'}
                  alt='User who added'
                  layout='fill'
                  className='rounded-full'
                />
              </div>
            </div>
          </div>
          {songData &&
            songData?.tracks.length > 0 &&
            songData.tracks.map((track: any) => (
              <div key={track.id}>
                <p>{track.name}</p>
                {/* <button className='btn btn-small btn-primary' onClick={() => console.log(track.id)}>
                ♥
              </button> */}
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default AlbumCard
