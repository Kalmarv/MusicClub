import { trpc } from '../utils/trpc'
import AlbumCover from './album-cover'
import DeleteAlbum from './delete-album-modal'
import Tracks from './tracks'

const AlbumCard: React.FC<{ id: string; user: string }> = ({ id, user }) => {
  const { invalidateQueries } = trpc.useContext()
  const { data: albumData, isSuccess: albumIsSuccess } = trpc.useQuery(['spotify.getAlbum', { id }])
  const { data: songData, isSuccess: songIsSuccess } = trpc.useQuery([
    'userData.getAlbumSongs',
    { albumId: id },
  ])
  const { data: userData, isSuccess: userIsSuccess } = trpc.useQuery([
    'userData.profile',
    { userId: user },
  ])

  return (
    <>
      {albumIsSuccess && userIsSuccess && (
        <div className='flex flex-col place-items-start px-8'>
          <AlbumCover user={userData} albumId={id} />
          <div className='mt-4' />
          <Tracks albumId={id} />
          <DeleteAlbum albumId={albumData.id} userId={userData?.id as string} />
        </div>
      )}
    </>
  )
}

export default AlbumCard
