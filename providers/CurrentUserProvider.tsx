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
import { FirestoreParentService } from '@/infrastructure/service/firebase/firestore/firestore_parent_service'
import { FirestoreUserService } from '@/infrastructure/service/firebase/firestore/firestore_user_service'

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
        const userRepository = new FirestoreUserService()
        const response = await userRepository.findById({ id: authUser.uid })
        const parentRepository = new FirestoreParentService()
        const parent = await parentRepository.findByUserId({
          userId: authUser.uid,
        })
        if (parent !== null) {
          response.setBabyId(parent.getBabyId())
        }
        const user = new User()
        user.setId(response.getId())
        user.setName(response.getName())
        user.setEmail(response.getEmail())
        user.setParentType(response.getParentType())
        user.setBabyId(response.getBabyId())
        user.setCreatedAt(response.getCreatedAt())

        setCurrentUser(user)

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
