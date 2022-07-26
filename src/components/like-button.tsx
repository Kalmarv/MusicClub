import { useCallback, useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import { useSpring, animated } from '@react-spring/web'

// https://www.joshwcomeau.com/react/boop/
function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}) {
  const [isBooped, setIsBooped] = useState(false)
  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  })
  useEffect(() => {
    if (!isBooped) {
      return
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped])
  const trigger = useCallback(() => {
    setIsBooped(true)
  }, [])
  let appliedStyle = style
  return [appliedStyle, trigger]
}

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

  const [clickAnimation, trigger] = useBoop({ rotation: 15 })

  return (
    <button className='flex' onClick={() => handleLike()}>
      <animated.svg
        xmlns='http://www.w3.org/2000/svg'
        className={`h-6 w-6 ${
          isLiked
            ? 'fill-primary stroke-black'
            : 'fill-transparent stroke-slate-700 hover:stroke-black'
        }`}
        // @ts-ignore
        style={clickAnimation}
        // @ts-ignore
        onClick={trigger}
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </animated.svg>
    </button>
  )
}

export default LikeButton
