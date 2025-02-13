'use client'

import { useEffect, useState } from 'react'

import { Category } from '@/domains/entities/category'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GetAllCategoryUseCase } from '@/usecase/GetAllCategoryUseCase/GetAllCategoryUseCase'

import AddCategoryButton from './AddCategory/AddCategoryButton'

const CategoriesSection = () => {
  const currentUser = useAuthContext().currentUser
  const [categories, setCategories] = useState<Category[]>([])

  const addCategories = (addCategory: Category) => {
    setCategories([...categories, addCategory])
  }

  useEffect(() => {
    const fetch = async () => {
      const usecase = new GetAllCategoryUseCase()
      const response = await usecase.execute({ userId: currentUser!.id })
      setCategories(response.categories)
    }
    fetch()
  }, [])

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>カテゴリー管理</h1>
      <div className='w-full space-y-2'>
        {categories.map((category) => (
          <div key={category.id} className='flex flex-row justify-between'>
            <p>{category.name}</p>
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
