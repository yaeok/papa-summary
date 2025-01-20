'use client'

import Link from 'next/link'

import { useAuthContext } from '@/providers/CurrentUserProvider'

type HeaderProps = {
  isSignInPage?: boolean
}

export default function Header({ isSignInPage }: HeaderProps) {
  const currentUser = useAuthContext()
  return (
    <header
      className={`absolute top-0 left-0 w-full px-4 lg:px-16 py-4 bg-white shadow-md}`}
    >
      <div className='max-w-screen-lg mx-auto flex flex-row justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold text-black'>
            <Link href='/'>
              <span className='hover:text-blue-500'>パパ準備</span>
            </Link>
          </h1>
        </div>
        <nav className='hidden lg:block'>
          <ul className='flex flex-row items-center gap-6'>
            <li>
              <Link href='/'>
                <span className='hover:border-b-2 hover:border-blue-500 hover:text-blue-500'>
                  TOP
                </span>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <span className='hover:border-b-2 hover:border-blue-500 hover:text-blue-500'>
                  CONTACT
                </span>
              </Link>
            </li>
            {currentUser?.currentUser ? (
              <li>
                <button onClick={() => console.log('logout')}>
                  <span className='px-8 py-2 text-base rounded-full text-white shadow-lg font-semibold bg-red-500'>
                    ログアウト
                  </span>
                </button>
              </li>
            ) : (
              <li>
                <Link href={isSignInPage ? 'sign_up' : 'sign_in'}>
                  <span
                    className={`px-8 py-2 text-base rounded-full text-white shadow-lg font-semibold ${
                      isSignInPage ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                  >
                    {isSignInPage ? '新規登録' : 'ログイン'}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
