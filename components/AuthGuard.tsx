'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { RoutePath } from '@/constants/RoutePath'
import { useAuthContext } from '@/providers/CurrentUserProvider'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const currentUser = useAuthContext()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      return
    }

    if (currentUser.currentUser != null && currentUser.isEmailVerified) {
      // 認証情報有かつメール認証済
      if (currentUser.currentUser.babyId != null) {
        // ベビー情報有
        router.replace(RoutePath.getTaskPage())
      }
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } else if (
      currentUser.currentUser != null &&
      !currentUser.isEmailVerified
    ) {
      // 認証情報有かつメール未認証
      setTimeout(() => {
        router.replace(RoutePath.getEmailVerificationPage())
      }, 2000)
    } else {
      // 認証情報無
      setTimeout(() => {
        router.replace(RoutePath.getLandingPage())
      }, 2000)
    }
  }, [currentUser, router])

  return <div>{loading ? <div>読み込み中...</div> : children}</div>
}
