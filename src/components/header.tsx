import { signOut } from 'next-auth/react'

const Header: React.FC<{ name: string; picture: string }> = ({ name, picture }) => {
  return (
    <div className='flex justify-between'>
      <h1 className='p-5 font-bold text-primary'>{name}</h1>
      <div className='w-12 h-12 mt-3'>
        {/* eslint-disable-next-line */}
        <img
          src={picture}
          alt='profile picture'
          className='rounded-full w-full h-full border-secondary border-4'
        />
      </div>
      <button onClick={() => signOut()} className='m-4 btn-ghost btn btn-sm'>
        Sign out
      </button>
    </div>
  )
}

export default Header
