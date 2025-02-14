import { useForm } from 'react-hook-form'

import { Status } from '@/constants/Status'
import { User } from '@/domains/entities/user'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { UpdateUserByIdUseCase } from '@/usecase/update_user_by_id_usecase/update_user_by_id_usecase'

type UpdateProfileFormType = {
  name: string
  parentType: number
}

type UpdateProfileFormProps = {
  onClose: () => void
}

const UpdateProfileForm = ({ onClose }: UpdateProfileFormProps) => {
  const authContext = useAuthContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      parentType: 0,
    },
  })

  const onSubmit = handleSubmit(async (data: UpdateProfileFormType) => {
    try {
      if (!authContext.currentUser) return

      const currentUser = authContext.currentUser

      const usecase = new UpdateUserByIdUseCase()
      await usecase.execute({
        userId: currentUser.getId(),
        name: data.name,
        parentType: parseInt(data.parentType.toString()),
      })

      const user = new User()
      user.setId(currentUser.getId())
      user.setName(data.name)
      user.setEmail(currentUser.getEmail())
      user.setParentType(parseInt(data.parentType.toString()))
      user.setBabyId(currentUser.getBabyId())
      user.setCreatedAt(currentUser.getCreatedAt())

      authContext.setCurrentUser(user)
      onClose()
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit} className='w-full space-y-4'>
        <section className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-sm'>
              呼び名<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('name', {
                required: '呼び名は必須です',
              })}
              className='border-2 border-gray-300 rounded-md p-2'
            />
            {errors.name && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='parentType' className='text-sm'>
              パパorママ<span className='text-red-500'>*</span>
            </label>
            <select
              id='parentType'
              {...register('parentType', {
                required: '選択してください',
              })}
              className='border-2 border-gray-300 rounded-md p-2'
            >
              <option value={Status.getParentTypeFather()}>パパ</option>
              <option value={Status.getParentTypeMother()}>ママ</option>
            </select>
            {errors.parentType && (
              <span className='pl-2 text-red-500 text-xs'>
                {errors.parentType.message}
              </span>
            )}
          </div>
        </section>
        <section className='flex justify-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-full px-4 py-1 shadow-md
              hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
          >
            更新
          </button>
        </section>
      </form>
    </div>
  )
}

export default UpdateProfileForm
