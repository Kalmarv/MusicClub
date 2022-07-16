import Image from 'next/image'
import { trpc } from '../utils/trpc'

const AlbumCard: React.FC<{ id: string }> = ({ id }) => {
  const albumData = trpc.useQuery(['spotify.getAlbum', { id }])

  return (
    <>
      {albumData.isSuccess && (
        <div className='flex flex-col place-items-start px-10'>
          <div className='relative aspect-square w-full max-w-md place-self-center'>
            <Image
              src={albumData.data.images[0].url}
              alt={albumData.data.name}
              layout='fill'
              className='rounded-lg shadow-2xl'
            />
          </div>
          <div className='mt-2' />
          <h1 className='font-bold text-2xl'>{albumData.data.name}</h1>
          <h2 className='text-2xl'>
            {albumData.data.artists.map((artist: any) => artist.name).join(', ')}
          </h2>
        </div>
      )}
    </>
  )
}

export default AlbumCard
