import { trpc } from '../utils/trpc'
import LikeButton from './like-button'

const Tracks: React.FC<{ albumId: string }> = ({ albumId }) => {
  const { data: songData } = trpc.useQuery(['userData.getAlbumSongs', { albumId }])

  const getDataTip = (track: any) => {
    const trackFavs = track.fav.map((fav: any) => fav.name)
    if (trackFavs.length < 6) return trackFavs.join(', ')
    const tooltip = trackFavs.slice(0, 5).join(', ') + ` and ${trackFavs.length - 5} others`
    return tooltip
  }

  if (!songData) return null

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
                data-tip={getDataTip(track)}>
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
