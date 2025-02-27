import { useForm } from 'react-hook-form'

import { Category } from '@/domains/entities/category'
import { useCategoryContext } from '@/providers/CategoryProvider'

type AddCategoryFormType = {
  name: string
}

type props = {
  onClose: () => void
}

const AddCategoryForm = ({ onClose }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryFormType>({
    defaultValues: {
      name: '',
    },
  })
  const categoryContext = useCategoryContext()

  const onSubmit = handleSubmit(async (data: AddCategoryFormType) => {
    // 引数のカテゴリー情報をセット
    const category = new Category()
    category.setName(data.name)

    // カテゴリー追加処理呼び出し
    categoryContext.addCategory(category)

    // モーダルを閉じる
    onClose()
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
