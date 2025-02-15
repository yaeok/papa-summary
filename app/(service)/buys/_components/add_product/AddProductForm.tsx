import { useForm } from 'react-hook-form'

import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { AddProductUseCase } from '@/usecase/add_product_usecase/add_product_usecase'

import { useProductContext } from '../../_hooks/ProductProvider'
import { useState } from 'react'

type AddProductFormType = {
  title: string
  price: number
  content: string
}

type AddProductFormProps = {
  onClose: () => void
}

const AddProductForm = ({ onClose }: AddProductFormProps) => {
  const [onTap, setOnTap] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormType>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      price: 0,
    },
  })

  const productContext = useProductContext()
  const currentUser = useAuthContext().currentUser

  const onSubmit = handleSubmit(async (data: AddProductFormType) => {
    try {
      setOnTap(true)

      const { title, content, price } = data

      if (!currentUser) return

      const babyId = currentUser.getBabyId()

      const usecase = new AddProductUseCase()

      const { response } = await usecase.execute({
        name: title,
        price,
        content,
        babyId: babyId,
      })

      productContext.addProduct(response)

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
          <div className='flex flex-col gap-2'>
            <label htmlFor='price'>
              値段<span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              {...register('price', {
                required: '値段は必須です',
              })}
              className='border-2 border-gray-300 rounded-md p-2'
            />
            {errors.price && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.price.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>
              内容<span className='text-red-500'>*</span>
            </label>
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
