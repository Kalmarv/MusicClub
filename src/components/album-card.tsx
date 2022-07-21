import Image from 'next/image'
import { AlbumTrack } from '../types'
import { SongData, trpc } from '../utils/trpc'
import DeleteAlbum from './delete-album-modal'
import LikeButton from './like-button'

const AlbumCard: React.FC<{ id: string; user: string }> = ({ id, user }) => {
  const { invalidateQueries } = trpc.useContext()
  const { data: albumData, isSuccess: albumIsSuccess } = trpc.useQuery(['spotify.getAlbum', { id }])
  const { data: songData, isSuccess: songIsSuccess } = trpc.useQuery([
    'userData.getAlbumSongs',
    { albumId: id },
  ])

  console.log()

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
            songData.tracks.map((track) => (
              <div
                key={track.id}
                className='flex justify-between w-full py-1 px-2 rounded-md hover:bg-base-200 flex-grow-0'>
                <p>{track.name}</p>
                <div className='flex'>
                  {track.fav.length > 0 && (
                    <div
                      className='tooltip tooltip-primary tooltip-left flex'
                      data-tip={
                        track.fav.map((fav: any) => fav.name).length < 6
                          ? track.fav.map((fav: any) => fav.name).join(', ')
                          : track.fav
                              .map((fav: any) => fav.name)
                              .splice(0, 5)
                              .join(', ') +
                            ` and ${track.fav.map((fav: any) => fav.name).length - 5} others`
                      }>
                      <p className='mr-1'>{`x${track.fav.length}`}</p>
                    </div>
                  )}
                  <LikeButton track={track} />
                </div>
              </div>
            ))}
          <DeleteAlbum albumId={albumData.id} userId={userData?.id as string} />
        </div>
      )}
    </>
  )
}

export default AlbumCard
