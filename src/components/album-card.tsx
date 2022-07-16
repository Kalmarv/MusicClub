import { trpc } from '../utils/trpc'

const AlbumCard: React.FC<{ expanded?: boolean; id: string }> = ({ expanded = false, id }) => {
  const albumData = trpc.useQuery(['spotify.getAlbum', { id }])

  console.log(albumData.data)

  return (
    <p>
      Album is {expanded ? 'expanded' : 'not expanded'} and id is {id}
    </p>
  )
}

export default AlbumCard
