import { trpc } from '../utils/trpc'
import AlbumCover from './album-cover'
import DeleteAlbum from './delete-album-modal'
import Tracks from './tracks'

const AlbumCard: React.FC<{ id: string; user: string }> = ({ id, user }) => {
  const { data: albumData } = trpc.useQuery(['spotify.getAlbum', { id }])
  const { data: userData } = trpc.useQuery(['userData.profile', { userId: user }])

  if (!albumData || !userData) {
    return null
  }

  return (
    <div className='flex flex-col place-items-start px-8'>
      <AlbumCover user={userData} albumId={id} />
      <div className='mt-4' />
      <Tracks albumId={id} />
      <DeleteAlbum albumId={albumData.id} userId={userData?.id as string} />
    </div>
  )
}

export default AlbumCard
