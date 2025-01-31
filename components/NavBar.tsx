import Link from 'next/link'

import { RoutePath } from '@/constants/RoutePath'

export default function NavBar() {
  return (
    <section className='w-full fixed bottom-0 h-14 lg:h-20 z-10'>
      <div className='max-w-screen-lg mx-auto flex justify-center'>
        <div className='w-full max-w-screen-md flex flex-row items-center'>
          <div className='p-2' />
          <Link
            href={RoutePath.getTaskPage()}
            className='flex-1 py-2 lg:py-4 bg-blue-50 rounded-lg text-center'
          >
            <span className='text-xs lg:text-base font-semibold'>
              やることリスト
            </span>
          </Link>
          <div className='p-2' />
          <Link
            href={RoutePath.getBuyPage()}
            className='flex-1 py-2 lg:py-4 bg-blue-50 rounded-lg text-center'
          >
            <span className='text-xs lg:text-base font-semibold'>
              かうものリスト
            </span>
          </Link>
          <div className='p-2' />
          <Link
            href={RoutePath.getProfilePage()}
            className='flex-1 py-2 lg:py-4 bg-blue-50 rounded-lg text-center'
          >
            <span className='text-xs lg:text-base font-semibold'>
              マイページ
            </span>
          </Link>
          <div className='p-2' />
        </div>
      </div>
    </section>
  )
}
