'use client'

import { useEffect, useState } from 'react'

import { Category } from '@/domains/entities/category'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GetAllCategoryUseCase } from '@/usecase/get_all_category_usecase/get_all_category_usecase'

import AddCategoryButton from './add_category/AddCategoryButton'

const CategoriesSection = () => {
  const currentUser = useAuthContext().currentUser
  const [categories, setCategories] = useState<Category[]>([])

  const addCategories = (addCategory: Category) => {
    setCategories([...categories, addCategory])
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!currentUser) return

        const userId = currentUser.getId()

        const usecase = new GetAllCategoryUseCase()
        const { response } = await usecase.execute({ userId })

        setCategories(response)
      } catch (error: any) {
        if (error instanceof SystemErrorException) {
          throw new SystemErrorException(error.message)
        } else {
          throw new SystemErrorException()
        }
      }
    }
    fetch()
  }, [])

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>カテゴリー管理</h1>
      <div className='w-full space-y-2'>
        {categories.map((category) => (
          <div key={category.getId()} className='flex flex-row justify-between'>
            <p>{category.getName()}</p>
            <button className='px-2 py-1 rounded-full bg-red-500 text-white'>
              削除
            </button>
          </div>
        ))}
      </div>
      <AddCategoryButton addCategories={addCategories} />
    </div>
  )
}

export default CategoriesSection
