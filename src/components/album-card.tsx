import Image from 'next/image'
import { AlbumTrack } from '../types'
import { trpc } from '../utils/trpc'

const AlbumCard: React.FC<{ id: string; user: string }> = ({ id, user }) => {
  const { invalidateQueries } = trpc.useContext()
  const { data: session } = trpc.useQuery(['auth.getSession'])
  const { data: albumData, isSuccess: albumIsSuccess } = trpc.useQuery(['spotify.getAlbum', { id }])
  const { data: songData, isSuccess: songIsSuccess } = trpc.useQuery([
    'userData.getAlbumSongs',
    { albumId: id },
  ])

  const { data: userData, isSuccess: userIsSuccess } = trpc.useQuery([
    'userData.profile',
    { userId: user },
  ])

  const favoriteSong = trpc.useMutation(['userData.favoriteTrack'], {
    onSuccess: () => invalidateQueries(['userData.getAlbumSongs']),
  })
  const unFavoriteSong = trpc.useMutation(['userData.unFavoriteTrack'], {
    onSuccess: () => invalidateQueries(['userData.getAlbumSongs']),
  })

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
            <div className='tooltip tooltip-primary' data-tip={userData?.name}>
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
          </div>
          <div className='mt-4' />
          {songData &&
            songData?.tracks.length > 0 &&
            songData.tracks.map((track: any) => (
              <div
                key={track.id}
                className='flex justify-between w-full py-1 px-2 rounded-md hover:bg-base-200'>
                <p>{track.name}</p>
                <button
                  onClick={() => {
                    track.fav.map((fav: any) => fav.id).some((v: any) => session?.id === v)
                      ? unFavoriteSong.mutate({ trackId: track.id })
                      : favoriteSong.mutate({ trackId: track.id })
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 ${
                      track.fav.map((fav: any) => fav.id).some((v: any) => session?.id === v)
                        ? 'fill-primary'
                        : 'fill-transparent'
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default AlbumCard
