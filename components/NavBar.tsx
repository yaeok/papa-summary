import Link from 'next/link'

export default function NavBar() {
  return (
    <section className='bottom-0 h-20 flex justify-center sticky z-10'>
      <div className='w-full max-w-screen-md flex flex-row items-center'>
        <div className='p-2' />
        <Link
          href='/tasks'
          className='flex-1 py-4 bg-blue-50 rounded-lg text-center'
        >
          <span className='text-xs lg:text-base'>やることリスト</span>
        </Link>
        <div className='p-2' />
        <Link
          href='/buys'
          className='flex-1 py-4 bg-blue-50 rounded-lg text-center'
        >
          <span className='text-xs lg:text-base'>かうものリスト</span>
        </Link>
        <div className='p-2' />
        <Link
          href='/profile'
          className='flex-1 py-4 bg-blue-50 rounded-lg text-center'
        >
          <span className='text-xs lg:text-base'>マイページ</span>
        </Link>
        <div className='p-2' />
      </div>
    </section>
  )
}
