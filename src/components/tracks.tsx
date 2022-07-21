import { trpc } from '../utils/trpc'
import LikeButton from './like-button'

const Tracks: React.FC<{ albumId: string }> = ({ albumId }) => {
  const { data: songData, isSuccess } = trpc.useQuery(['userData.getAlbumSongs', { albumId }])

  if (!songData) {
    return null
  }

  return (
    <>
      {songData.tracks.map((track) => (
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
    </>
  )
}

export default Tracks
