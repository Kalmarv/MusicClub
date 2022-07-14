import { signOut } from 'next-auth/react'

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className='flex justify-between'>
      <h1 className='p-5 font-bold text-primary'>{name}</h1>
      <button onClick={() => signOut()} className='m-4 btn-ghost btn btn-sm'>
        Sign out
      </button>
    </div>
  )
}

export default Header
