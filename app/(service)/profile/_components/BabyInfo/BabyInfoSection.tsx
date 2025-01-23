const BabyInfoSection = () => {
  return (
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
  )
}

export default BabyInfoSection
