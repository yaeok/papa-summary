'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { AuthRepository } from '@/infrastructure/repository/auth_repository'

type SignUpFormType = {
  username: string
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
    reset,
    formState: { errors },
  } = useForm<SignUpFormType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async (data: SignUpFormType) => {
    try {
      const repository = new AuthRepository()
      await repository.signUp(data)
      router.push('/email_verify')
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <div className='px-2 py-20 w-full min-h-screen justify-center items-center flex'>
      <div className='w-full lg:w-1/4 bg-gray-50 rounded-lg p-8 shadow-md flex flex-col items-center gap-4'>
        <form onSubmit={onSubmit} className='w-full space-y-4'>
          <section className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='username'>
                ユーザ名<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                {...register('username', {
                  required: 'ユーザ名を入力してください',
                  maxLength: {
                    value: 20,
                    message: 'ユーザ名は20文字以内で入力してください',
                  },
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.username && (
                <span className='pl-2 text-red-500 text-xs'>
                  {errors.username.message}
                </span>
              )}
            </div>
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
              className='px-4 py-2 rounded-full bg-blue-400 text-white font-semibold shadow-md
              hover:bg-blue-500 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
            >
              新規登録
            </button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Page
