'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ErrorMessageModal from '@/components/ErrorMessageModal'
import { RoutePath } from '@/constants/RoutePath'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { CheckEmailVerifyUseCase } from '@/usecase/check_email_verify_usecase/check_email_verify_usecase'

const CheckEmailVerifyButton = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleVerifyEmail = async () => {
    try {
      const usecase = new CheckEmailVerifyUseCase()
      const result = await usecase.execute()
      if (result.result) {
        router.push(RoutePath.getNewPage())
      }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        setMessage(error.message)
        handleOpen()
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleVerifyEmail}
        className='px-8 py-2 rounded-full bg-green-500 text-white font-semibold shadow-md
        hover:bg-green-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
      >
        認証しました
      </button>
      <ErrorMessageModal
        isOpen={isOpen}
        onClose={handleClose}
        message={message}
      />
    </div>
  )
}

export default CheckEmailVerifyButton
