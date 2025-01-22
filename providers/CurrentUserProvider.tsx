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
import { UserRepository } from '@/infrastructure/repository/user_repository'
import { auth } from '@/infrastructure/service/firebase/config/firebaseConfig'

type AuthContextType = {
  currentUser: User | null
  isEmailVerified: boolean
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => useContext(AuthContext)

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isEmailVerified, setIsVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const repository = new UserRepository()
        const response = await repository.findById({ id: user.uid })
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
      {loading ? <p>ろーでぃんぐ</p> : children}
    </AuthContext.Provider>
  )
}
