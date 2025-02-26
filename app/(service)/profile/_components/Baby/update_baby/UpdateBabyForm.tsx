import { useForm } from 'react-hook-form'

import { Baby } from '@/domains/entities/baby'
import { UpdateBabyByIdUseCase } from '@/usecase/update_baby_by_id_usecase'

type UpdateBabyFormType = {
  name: string
  birthDate: string
}

type UpdateBabyFormProps = {
  onClose: () => void
  babyInfo: Baby
  setBabyInfo: (baby: Baby) => void
}

const UpdateBabyForm = ({
  onClose,
  babyInfo,
  setBabyInfo,
}: UpdateBabyFormProps) => {
  const initialDate =
    babyInfo && babyInfo.getBirthDate()
      ? new Date(babyInfo.getBirthDate()!).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBabyFormType>({
    mode: 'onChange',
    defaultValues: {
      name: babyInfo ? babyInfo.getName() : '',
      birthDate: initialDate,
    },
  })

  const onSubmit = handleSubmit(async (data: UpdateBabyFormType) => {
    try {
      const usecase = new UpdateBabyByIdUseCase()
      const { response } = await usecase.execute({
        babyId: babyInfo.getId(),
        name: data.name,
        birthDate: data.birthDate,
      })
      setBabyInfo(response)
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
            <label htmlFor='birthDate' className='text-sm'>
              予定日
            </label>
            <input
              type='date'
              {...register('birthDate')}
              className='border-2 border-gray-300 rounded-md p-2'
            />
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

export default UpdateBabyForm
