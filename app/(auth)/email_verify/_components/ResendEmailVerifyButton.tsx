'use client'

import { useState } from 'react'

import ErrorMessageModal from '@/components/ErrorMessageModal'
import MessageModal from '@/components/MessageModal'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { ResendEmailVerifyUseCase } from '@/usecase/ResendEmailVerifyUseCase/ResendEmailVerifyUseCase'

const ResendEmailVefiryButton = () => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleErrorOpen = () => setIsErrorModalOpen(true)
  const handleErrorClose = () => setIsErrorModalOpen(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSendEmail = async () => {
    try {
      const usecase = new ResendEmailVerifyUseCase()
      await usecase.execute()
      setMessage('確認メールを再送信しました。')
      handleOpen()
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        setMessage(error.message)
        handleErrorOpen()
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleSendEmail}
        className='px-8 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md
        hover:bg-red-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
      >
        確認メールを再送信する
      </button>
      <ErrorMessageModal
        isOpen={isErrorModalOpen}
        onClose={handleErrorClose}
        message={message}
      />
      <MessageModal
        isOpen={isOpen}
        onClose={handleClose}
        title='完了'
        message={message}
      />
    </div>
  )
}

export default ResendEmailVefiryButton
