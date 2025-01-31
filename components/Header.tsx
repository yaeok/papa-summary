'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { RoutePath } from '@/constants/RoutePath'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { SignOutUseCase } from '@/usecase/SignOutUseCase/SignOutUseCase'

import Drawer from './Drawer/Drawer'

type HeaderProps = {
  isSignIn?: boolean
}

export default function Header({ isSignIn }: HeaderProps) {
  const router = useRouter()
  const currentUser = useAuthContext()
  const handleLogout = async () => {
    try {
      const usecase = new SignOutUseCase()
      const response = await usecase.execute()

      if (response.result) {
        alert('ログアウトしました')
        router.push(RoutePath.getLandingPage())
      }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
  return (
    <header className='top-0 left-0 w-full px-4 lg:px-16 py-4 bg-white shadow-md sticky z-10'>
      <div className='max-w-screen-lg mx-auto flex flex-row justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold text-black'>
            <Link
              href={
                currentUser?.currentUser
                  ? RoutePath.getTaskPage()
                  : RoutePath.getLandingPage()
              }
            >
              <span className='hover:text-blue-500'>パパ準備</span>
            </Link>
          </h1>
        </div>

        <Drawer isSignIn={isSignIn} />

        <nav className='hidden lg:block'>
          <ul className='flex flex-row items-center gap-6'>
            <li>
              <Link href={RoutePath.getLandingPage()}>
                <span className='hover:border-b-2 hover:border-blue-500 hover:text-blue-500'>
                  TOP
                </span>
              </Link>
            </li>
            <li>
              <Link href={RoutePath.getLandingPage()}>
                <span className='hover:border-b-2 hover:border-blue-500 hover:text-blue-500'>
                  CONTACT
                </span>
              </Link>
            </li>
            {currentUser?.currentUser ? (
              <li>
                <button
                  onClick={handleLogout}
                  className='bg-red-500 text-white rounded-full px-4 py-1 shadow-md
                  hover:bg-red-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
                >
                  ログアウト
                </button>
              </li>
            ) : (
              <li>
                <Link href={isSignIn ? 'sign_up' : 'sign_in'}>
                  <span
                    className={`px-8 py-2 text-base rounded-full text-white shadow-lg font-semibold ${
                      isSignIn ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                  >
                    {isSignIn ? '新規登録' : 'ログイン'}
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
