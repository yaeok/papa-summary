'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import FullScreenLoading from '@/components/Loading/FullScreenLoading'
import { User } from '@/domains/entities/user'
import { auth } from '@/infrastructure/service/firebase/config/firebaseConfig'
import { GetCurrentUserUseCase } from '@/usecase/common/get_current_user_usecase'

type AuthContextType = {
  currentUser: User | null
  isEmailVerified: boolean
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isEmailVerified: false,
  setCurrentUser: () => null,
})

export const useAuthContext = () => useContext(AuthContext)

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isEmailVerified, setIsVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const usecase = new GetCurrentUserUseCase()
        const { response } = await usecase.execute()

        setCurrentUser(response)

        if (authUser.emailVerified) {
          setIsVerified(true)
        } else {
          setIsVerified(false)
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isEmailVerified,
        setCurrentUser,
      }}
    >
      {loading ? <FullScreenLoading /> : children}
    </AuthContext.Provider>
  )
}
