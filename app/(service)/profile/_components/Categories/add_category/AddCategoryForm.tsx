import { useForm } from 'react-hook-form'

import { Category } from '@/domains/entities/category'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { AddCategoryUseCase } from '@/usecase/add_category_usecase/add_category_usecase'

type AddCategoryFormType = {
  name: string
}

type AddCategoryFormProps = {
  onClose: () => void
  addCategories: (addCategory: Category) => void
}

const AddCategoryForm = ({ onClose, addCategories }: AddCategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryFormType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  })
  const currentUser = useAuthContext().currentUser

  const onSubmit = handleSubmit(async (data: AddCategoryFormType) => {
    try {
      const usecase = new AddCategoryUseCase()

      if (!currentUser) return

      const { response } = await usecase.execute({
        name: data.name,
        babyId: currentUser.getBabyId(),
      })

      addCategories(response)

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
              カテゴリー名<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('name', {
                required: 'カテゴリー名は必須です',
              })}
              className='border-2 border-gray-300 rounded-md p-2'
            />
            {errors.name && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.name.message}
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
            登録
          </button>
        </section>
      </form>
    </div>
  )
}

export default AddCategoryForm
