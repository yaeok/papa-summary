'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import DrawerButton from '@/components/Drawer/DrawerButton/DrawerButton'
import { RoutePath } from '@/constants/RoutePath'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { SignOutUseCase } from '@/usecase/sign_out_usecase'

type props = {
  isSignIn?: boolean
}

export default function Drawer({ isSignIn }: props) {
  const currentUser = useAuthContext()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      const usecase = new SignOutUseCase()
      const { response } = await usecase.execute()

      if (response) {
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
    <div>
      <div
        id='drawer-example'
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white w-60 sm:w-80`}
        tabIndex={-1}
        aria-labelledby='drawer-label'
      >
        <button
          type='button'
          className='text-slate-800 bg-transparent rounded-lg text-sm w-8 h-8 absolute top-4 right-4 flex items-center justify-center'
          onClick={toggleDrawer}
        >
          ✕
        </button>
        <nav className='pl-4 pt-8'>
          <ul className='flex flex-col gap-8'>
            <li>
              <Link href={RoutePath.getLandingPage()}>
                <span className='text-lg font-mono font-semibold border-blue-500 hover:text-blue-500 hover:border-b-2'>
                  HOME
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
      <DrawerButton toggleDrawer={toggleDrawer} />
    </div>
  )
}
