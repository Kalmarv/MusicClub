import { trpc } from '../utils/trpc'

const AlbumCard: React.FC<{ expanded?: boolean; id: string }> = ({ expanded = false, id }) => {
  const albumData = trpc.useQuery(['spotify.getAlbum', { id }])
  const addAlbum = trpc.useMutation(['spotify.addAlbum'])

  console.log(albumData.data)

  return (
    <>
      <p>
        Album is {expanded ? 'expanded' : 'not expanded'} and id is {id}
      </p>
      <button onClick={() => addAlbum.mutate({ spotifyId: id })}>add</button>
    </>
  )
}

export default AlbumCard
