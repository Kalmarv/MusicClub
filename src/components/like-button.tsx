import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'

const LikeButton: React.FC<{ track: any }> = ({ track }) => {
  const { invalidateQueries } = trpc.useContext()
  const { data: session } = trpc.useQuery(['auth.getSession'])

  // For optimistic updates
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    const likeState = track.fav.map((fav: any) => fav.id).some((v: any) => session?.id === v)
    setIsLiked(likeState)
  }, [track.fav, session?.id])

  const favoriteSong = trpc.useMutation(['userData.favoriteTrack'], {
    onSuccess: () => {
      invalidateQueries(['userData.getAlbumSongs'])
      setIsLiked(true)
    },
  })
  const unFavoriteSong = trpc.useMutation(['userData.unFavoriteTrack'], {
    onSuccess: () => {
      invalidateQueries(['userData.getAlbumSongs'])
      setIsLiked(false)
    },
  })

  const handleLike = () => {
    // if favorites includes current userId
    if (isLiked) {
      setIsLiked(false)
      unFavoriteSong.mutate({ trackId: track.id })
    } else {
      setIsLiked(true)
      favoriteSong.mutate({ trackId: track.id })
    }
  }

  return (
    <button className='flex' onClick={() => handleLike()}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`h-6 w-6 ${
          isLiked
            ? 'fill-primary stroke-black'
            : 'fill-transparent stroke-slate-700 hover:stroke-black'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
    </button>
  )
}

export default LikeButton
