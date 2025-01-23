'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMessageModal from '@/components/ErrorMessageModal'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { SignUpUseCase } from '@/usecase/SignUpUseCase/SignUpUseCase'

type SignUpFormType = {
  email: string
  password: string
  confirmPassword: string
}

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const onSubmit = handleSubmit(async (data: SignUpFormType) => {
    try {
      const usecase = new SignUpUseCase()
      const response = await usecase.execute({
        email: data.email,
        password: data.password,
      })
      if (response.result) {
        router.push('/email_verify')
      }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        setMessage(error.message)
        handleOpen()
      }
    }
  })
  return (
    <div className='px-2 py-20 justify-center items-center flex'>
      <div className='w-full lg:w-1/4 bg-gray-50 rounded-lg p-8 shadow-md flex flex-col items-center gap-4'>
        <form onSubmit={onSubmit} className='w-full space-y-4'>
          <section className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>
                メールアドレス<span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                {...register('email', {
                  required: 'メールアドレスを入力してください',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '正しいメールアドレスを入力してください',
                  },
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.email && (
                <span className='pl-2 text-red-500 text-xs'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='password'>
                パスワード<span className='text-red-500'>*</span>
              </label>
              <input
                type='password'
                {...register('password', {
                  required: 'パスワードを入力してください',
                  minLength: {
                    value: 8,
                    message: 'パスワードは8文字以上で入力してください',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      '大文字、小文字、数字を1文字以上含むパスワードを入力してください',
                  },
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.password && (
                <span className='pl-2 text-red-500 text-xs'>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='confirmPassword'>
                パスワード（確認用）<span className='text-red-500'>*</span>
              </label>
              <input
                type='password'
                {...register('confirmPassword', {
                  required: 'パスワードを入力してください',
                  validate: (value) =>
                    value === watch('password') || 'パスワードが一致しません',
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.confirmPassword && (
                <span className='pl-2 text-red-500 text-xs'>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </section>
          <section className='flex justify-center'>
            <button
              type='submit'
              className='px-4 py-2 rounded-full bg-blue-500 text-white font-semibold shadow-md
              hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
            >
              新規登録
            </button>
          </section>
        </form>
      </div>
      <ErrorMessageModal
        isOpen={isOpen}
        onClose={handleClose}
        message={message}
      />
    </div>
  )
}

export default Page
