import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuCircleMinus, LuCirclePlus } from 'react-icons/lu'

import { Category } from '@/domains/entities/category'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { useCategoryContext } from '@/providers/CategoryProvider'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { AddProductUseCase } from '@/usecase/add_product_usecase'

import { useProductListPageContext } from '../../_hooks/ProductListPageProvider'

type AddProductFormType = {
  title: string
  price: number
  content: string
  category: string
}

type AddProductFormProps = {
  onClose: () => void
}

const AddProductForm = ({ onClose }: AddProductFormProps) => {
  const [onTap, setOnTap] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddProductFormType>({
    defaultValues: {
      title: '',
      content: '',
      price: 1000,
    },
  })

  const price = watch('price')

  const productListPageContext = useProductListPageContext()
  const currentUser = useAuthContext().currentUser
  const categoryContext = useCategoryContext()

  const onSubmit = handleSubmit(async (data: AddProductFormType) => {
    try {
      setOnTap(true)

      const { title, content, price, category } = data

      if (!currentUser) return

      const babyId = currentUser.getBabyId()

      const usecase = new AddProductUseCase()

      const { response } = await usecase.execute({
        name: title,
        price,
        content,
        babyId: babyId,
        categoryId: category,
      })

      response.setCategories(
        categoryContext.categories.filter((c) => c.getId() === category)
      )

      productListPageContext.addProduct(response)

      onClose()
    } catch (error: unknown) {
      if (error instanceof SystemErrorException) {
        throw new SystemErrorException(error.message)
      } else {
        throw new SystemErrorException()
      }
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit} className='w-full space-y-4'>
        <section className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>
              タイトル<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('title', {
                required: 'タイトルは必須です',
              })}
              className='border-2 border-gray-300 rounded-md p-2'
            />
            {errors.title && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.title.message}
              </span>
            )}
          </div>
          <div className='flex items-center gap-8'>
            <label htmlFor='price'>値段</label>
            <div className='flex justify-start items-center gap-2'>
              <button onClick={() => setValue('price', price + 1000)}>
                <LuCirclePlus size={25} />
              </button>
              <input
                type='number'
                {...register('price')}
                disabled={true}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              <button
                onClick={() => setValue('price', price - 1000)}
                disabled={price <= 1000}
                className='disabled:opacity-50'
              >
                <LuCircleMinus size={25} />
              </button>
            </div>
            {errors.price && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.price.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='category'>カテゴリー</label>
            <select
              className='border-2 border-gray-300 rounded-md p-2'
              {...register('category')}
            >
              <option value=''>選択してください</option>
              {categoryContext.categories.map((category: Category) => (
                <option key={category.getId()} value={category.getId()}>
                  {category.getName()}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>内容</label>
            <textarea
              {...register('content')}
              className='border-2 border-gray-300 rounded-md p-2 h-40 max-h-48'
            />
            {errors.content && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.content.message}
              </span>
            )}
          </div>
        </section>
        <section className='flex justify-center'>
          <button
            type='submit'
            disabled={onTap}
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

export default AddProductForm
