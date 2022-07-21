import { trpc } from '../utils/trpc'

const DeleteAlbum: React.FC<{ albumId: string; userId: string }> = ({ albumId, userId }) => {
  const { invalidateQueries } = trpc.useContext()

  const { data: session } = trpc.useQuery(['auth.getSession'])
  const deleteAlbum = trpc.useMutation(['userData.deleteAlbum'], {
    onSuccess: () => invalidateQueries(['userData.getAddedAlbums']),
  })

  if (userId !== session?.id || session?.user?.name !== 'Kalmarv') return null

  return (
    <>
      <label htmlFor='delete-confirm' className='btn btn-primary mt-4 btn-sm'>
        Delete Album
      </label>
      <input type='checkbox' id='delete-confirm' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Are you sure?</h3>
          <p className='py-4'>
            This will delete the album and all of its songs. This action cannot be undone.
          </p>
          <div className='modal-action'>
            <label
              htmlFor='delete-confirm'
              className='btn btn-primary'
              onClick={() => {
                deleteAlbum.mutate({ albumId })
              }}>
              Yes
            </label>
            <label htmlFor='delete-confirm' className='btn'>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteAlbum
