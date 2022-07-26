import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'
import { MouseEventHandler, MutableRefObject, useRef } from 'react'
import { trpc, UserProfile } from '../utils/trpc'

const calc = (x: number, y: number, rect: DOMRect) => [
  -(y - rect.top - rect.height / 2) / 50,
  (x - rect.left - rect.width / 2) / 50,
  1,
]

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const AlbumCover: React.FC<{ user: UserProfile; albumId: string }> = ({ user, albumId }) => {
  const { data: albumData, isFetching } = trpc.useQuery(['spotify.getAlbum', { id: albumId }])
  const coverRef = useRef<HTMLDivElement>(null)

  const config = {
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,
  }

  const [{ xys }, api] = useSpring(() => ({ xys: [0, 0, 1], config }), [config])

  const handleMouseLeave = () =>
    api.start({
      xys: [0, 0, 1],
    })

  const handleMouseMove = (event: React.MouseEvent) => {
    if (coverRef.current) {
      const rect: DOMRect = coverRef.current.getBoundingClientRect()
      api.start({
        xys: calc(event.clientX, event.clientY, rect),
      })
    }
  }

  return (
    <>
      <animated.div
        className='relative aspect-square w-full max-w-md place-self-center'
        ref={coverRef}
        style={{ transform: xys.to(trans) }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}>
        <a href={albumData.uri}>
          <Image
            src={albumData.images[0].url}
            alt={albumData.name}
            layout='fill'
            className='rounded-lg'
            priority={true}
          />
        </a>
      </animated.div>
      <div className='mt-4' />

      <div className='flex flex-row place-content-between w-full'>
        <div>
          <h1 className='font-bold text-2xl'>{albumData.name}</h1>
          <h2 className='text-2xl'>
            {albumData.artists.map((artist: any) => artist.name).join(', ')}
          </h2>
        </div>

        <div className='tooltip tooltip-primary' data-tip={user?.name ?? 'Unknown'}>
          <div className='w-14 h-14 m-2'>
            <div className='relative aspect-square'>
              <Image
                src={user?.image ?? '/profile-placeholder.png'}
                alt='User who added'
                layout='fill'
                className='rounded-full'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumCover
