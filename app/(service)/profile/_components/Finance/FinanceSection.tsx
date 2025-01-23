const FinanceSection = () => {
  return (
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
  )
}

export default FinanceSection
