const CategoriesSection = () => {
  return (
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
  )
}

export default CategoriesSection
