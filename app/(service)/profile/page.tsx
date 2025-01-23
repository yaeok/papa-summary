import Avatar from 'boring-avatars'

const Page = () => {
  const parent = false
  return (
    <div className='w-full px-8 flex flex-col items-center gap-4'>
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='w-full py-8 flex flex-col items-center justify-center gap-4'>
          <div className='relative w-36 h-36'>
            <Avatar size='150px' name='' variant='bauhaus' />
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

      <div className='w-full border-b-2 border-gray-800' />

      <div className='w-full flex flex-col items-center gap-4'>
        <h1>赤ちゃん情報</h1>

        <div className='w-full'>
          <div className='flex flex-row justify-between'>
            <p>呼び名</p>
            <p>未設定</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>予定日</p>
            <p>未設定</p>
          </div>
        </div>
        <button className='px-4 py-1 rounded-full bg-blue-500 text-white'>
          情報更新
        </button>
      </div>

      <div className='w-full border-b-2 border-gray-800' />

      <div className='w-full flex flex-col items-center gap-4'>
        <h1>予算管理</h1>
        <div className='w-full'>
          <div className='flex flex-row justify-between'>
            <p>予算金額</p>
            <p>¥ 0</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>支払い金額</p>
            <p>¥ 0</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>合計金額</p>
            <p>¥ 0</p>
          </div>
        </div>
      </div>

      <div className='w-full border-b-2 border-gray-800' />

      <div className='w-full flex flex-col items-center gap-4'>
        <h1>カテゴリー管理</h1>
        <div className='w-full'>
          <div className='w-full flex flex-row justify-between'>
            <p>カテゴリー名</p>
            <p>未設定</p>
          </div>
          <div className='w-full flex flex-row justify-between'>
            <p>カテゴリー名</p>
            <p>未設定</p>
          </div>
          <div className='w-full flex flex-row justify-between'>
            <p>カテゴリー名</p>
            <p>未設定</p>
          </div>
        </div>
        <button className='px-4 py-1 rounded-full bg-green-500 text-white'>
          追加
        </button>
      </div>
    </div>
  )
}

export default Page
