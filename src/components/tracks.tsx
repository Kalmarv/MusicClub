import { trpc } from '../utils/trpc'
import LikeButton from './like-button'

const TrackSkeleton = () => {
  return (
    <>
      <div className='w-full mx-auto'>
        <div className='flex animate-pulse flex-row items-center h-full space-x-5'>
          <div className='flex flex-col space-y-3'>
            <div className='w-36 bg-base-300 h-6 rounded-md' />
            <div className='w-24 bg-base-300 h-6 rounded-md' />
            <div className='w-40 bg-base-300 h-6 rounded-md' />
            <div className='w-20 bg-base-300 h-6 rounded-md' />
            <div className='w-32 bg-base-300 h-6 rounded-md' />
            <div className='w-28 bg-base-300 h-6 rounded-md' />
          </div>
        </div>
      </div>
    </>
  )
}

const Tracks: React.FC<{ albumId: string }> = ({ albumId }) => {
  const { data: songData, isFetching } = trpc.useQuery(['userData.getAlbumSongs', { albumId }])

  const getDataTip = (track: any) => {
    const trackFavs = track.fav.map((fav: any) => fav.name)
    if (trackFavs.length < 6) return trackFavs.join(', ')
    const tooltip = trackFavs.slice(0, 5).join(', ') + ` and ${trackFavs.length - 5} others`
    return tooltip
  }

  if ((isFetching && !songData) || !songData) return <TrackSkeleton />

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
                <p className='mr-1'>{`${track.fav.length}`}</p>
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
