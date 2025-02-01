'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { User } from '@/domains/User'
import { ParentRepository } from '@/infrastructure/repository/parent_repository'
import { UserRepository } from '@/infrastructure/repository/user_repository'
import { auth } from '@/infrastructure/service/firebase/config/firebaseConfig'
import FullScreenLoading from '@/components/Loading/FullScreenLoading'

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRepository = new UserRepository()
        const response = await userRepository.findById({ id: user.uid })
        const parentRepository = new ParentRepository()
        const parent = await parentRepository.findByUserId({ userId: user.uid })
        if (parent !== null) {
          response.babyId = parent.babyId
        }
        setCurrentUser(response)

        if (user.emailVerified) {
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
