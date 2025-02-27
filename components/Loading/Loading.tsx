export default function Loading() {
  return (
    <div className='w-full py-24 flex justify-center items-center gap-6'>
      <div className='h-14 w-14 animate-spin border-[6px] border-red-400 rounded-full border-t-transparent'></div>
      <p className='text-4xl font-semibold animate-pulse'>Loading</p>
    </div>
  )
}
