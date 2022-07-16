import Image from 'next/image'
import { trpc } from '../utils/trpc'

const AlbumCard: React.FC<{ id: string; user: string }> = ({ id, user }) => {
  const albumData = trpc.useQuery(['spotify.getAlbum', { id }])
  const { data: userData, isSuccess: userIsSuccess } = trpc.useQuery([
    'userData.profile',
    { userId: user },
  ])

  return (
    <>
      {albumData.isSuccess && userIsSuccess && (
        <div className='flex flex-col place-items-start px-8'>
          <div className='relative aspect-square w-full max-w-md place-self-center'>
            <Image
              src={albumData.data.images[0].url}
              alt={albumData.data.name}
              layout='fill'
              className='rounded-lg shadow-2xl'
            />
          </div>
          <div className='mt-4' />
          <div className='flex flex-row place-content-between w-full'>
            <div>
              <h1 className='font-bold text-2xl'>{albumData.data.name}</h1>
              <h2 className='text-2xl'>
                {albumData.data.artists.map((artist: any) => artist.name).join(', ')}
              </h2>
            </div>
            <div className='w-16 h-16 m-2'>
              <div className='relative aspect-square'>
                <Image
                  src={userData?.image as string}
                  alt='User who added'
                  layout='fill'
                  className='rounded-full'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AlbumCard
