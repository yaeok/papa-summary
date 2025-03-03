type props = {
  startDate: Date
  endDate: Date | null
}

export default function DateSection({ startDate, endDate }: props) {
  if (endDate !== null) {
    return (
      <div className='text-center'>
        <p className='text-sm'>
          {startDate.toLocaleDateString()} 〜 {endDate.toLocaleDateString()}
        </p>
      </div>
    )
  } else {
    return (
      <div className='text-center'>
        <p className='text-sm'>{startDate.toLocaleDateString()}</p>
      </div>
    )
  }
}
