import Avatar from 'boring-avatars'

const ProfileSection = () => {
  const parent = true

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <div className='w-full py-8 flex flex-col items-center justify-center gap-4'>
        <div className='relative w-36 h-36'>
          <Avatar size='150px' name='yaeok' variant='bauhaus' />
          <div className='absolute bottom-0 -right-4'>
            {parent ? (
              <span className='px-4 py-1 bg-blue-400 rounded-full'>ぱぱ</span>
            ) : (
              <span className='px-4 py-1 bg-red-400 rounded-full'>まま</span>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-sm'>ユーザ名</p>
          <div className='flex flex-row gap-2'>
            <p>kohei</p>
          </div>
          <p className='text-sm'>メールアドレス</p>
          <p>yaeok.engineer@gmail</p>
        </div>
      </div>
      <button className='px-4 py-1 rounded-full bg-blue-500 text-white'>
        情報更新
      </button>
    </div>
  )
}

export default ProfileSection
