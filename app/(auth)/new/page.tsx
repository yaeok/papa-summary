'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { RoutePath } from '@/constants/RoutePath'
import { Status } from '@/constants/Status'
import { CreateUserAndBabyInfoUseCase } from '@/usecase/create_user_and_baby_usecase/create_user_and_baby_usecase'

type UserInfoFormType = {
  username: string
  parentType: string
  babyName: string
  babyBirthDate: string
}

const Page = () => {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoFormType>({
    defaultValues: {
      username: '',
      parentType: '',
      babyName: '',
      babyBirthDate: today,
    },
  })

  const onSubmit = handleSubmit(async (data: UserInfoFormType) => {
    const usecase = new CreateUserAndBabyInfoUseCase()
    const result = await usecase.execute({
      name: data.username,
      parentType: parseInt(data.parentType),
      babyName: data.babyName,
      babyBirthday: data.babyBirthDate,
    })

    if (result.result) router.push(RoutePath.getTaskPage())
  })

  return (
    <div className='px-2 py-4 justify-center items-center flex'>
      <div className='w-full lg:w-1/4 bg-gray-50 rounded-lg px-8 py-4 shadow-md flex flex-col items-center gap-4'>
        <form onSubmit={onSubmit} className='w-full space-y-4'>
          <section className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold'>ユーザ情報</h1>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='username'>
                  ユーザ名<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='username'
                  {...register('username', {
                    required: 'ユーザ名を入力してください',
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
                <label htmlFor='parentType'>
                  パパorママ<span className='text-red-500'>*</span>
                </label>
                <select
                  id='parentType'
                  {...register('parentType', {
                    required: '選択してください',
                  })}
                  className='border-2 border-gray-300 rounded-md p-2'
                >
                  <option value=''>選択してください</option>
                  <option value={Status.getParentTypeFather()}>パパ</option>
                  <option value={Status.getParentTypeMother()}>ママ</option>
                </select>
                {errors.parentType && (
                  <span className='pl-2 text-red-500 text-xs'>
                    {errors.parentType.message}
                  </span>
                )}
              </div>
            </div>
            <h1 className='text-xl font-semibold'>ベイビー情報</h1>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='babyName'>
                  呼び名<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='babyName'
                  {...register('babyName', {
                    required: '呼び名を入力してください',
                  })}
                  className='border-2 border-gray-300 rounded-md p-2'
                />
                {errors.babyName && (
                  <span className='pl-2 text-red-500 text-xs'>
                    {errors.babyName.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='babyBirthDate'>予定日</label>
                <input
                  type='date'
                  id='babyBirthDate'
                  {...register('babyBirthDate', {
                    validate: (value) => {
                      const today = new Date().toISOString().split('T')[0]
                      if (value < today) {
                        return '未来の日付を入力してください'
                      }
                      return true
                    },
                  })}
                  className='border-2 border-gray-300 rounded-md p-2'
                />
                {errors.babyBirthDate && (
                  <span className='pl-2 text-red-500 text-xs'>
                    {errors.babyBirthDate.message}
                  </span>
                )}
              </div>
            </div>
          </section>
          <section className='flex justify-center'>
            <button
              type='submit'
              className='px-4 py-2 rounded-full bg-blue-500 text-white font-semibold shadow-md
              hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
            >
              登録
            </button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Page
