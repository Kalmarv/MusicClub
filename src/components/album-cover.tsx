import Image from 'next/image'
import { trpc, UserProfile } from '../utils/trpc'

const AlbumCover: React.FC<{ user: UserProfile; albumId: string }> = ({ user, albumId }) => {
  const { data: albumData, isSuccess: albumIsSuccess } = trpc.useQuery([
    'spotify.getAlbum',
    { id: albumId },
  ])

  return (
    <>
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

        <div className='tooltip tooltip-primary' data-tip={user?.name ?? 'Unknown'}>
          <div className='w-14 h-14 m-2'>
            <div className='relative aspect-square'>
              <Image
                src={user?.image ?? '/profile-placeholder.png'}
                alt='User who added'
                layout='fill'
                className='rounded-full'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumCover
