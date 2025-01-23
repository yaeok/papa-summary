'use client'

import { useAuthContext } from '@/providers/CurrentUserProvider'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

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
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } else if (
      currentUser.currentUser != null &&
      !currentUser.isEmailVerified
    ) {
      // 認証情報有かつメール未認証
      setTimeout(() => {
        router.replace('/email_verify')
      }, 2000)
    } else {
      // 認証情報無
      setTimeout(() => {
        router.replace('/')
      }, 2000)
    }
  }, [currentUser, router])

  return <div>{loading ? <div>読み込み中...</div> : children}</div>
}
