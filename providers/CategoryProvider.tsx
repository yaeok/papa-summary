'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Category } from '@/domains/entities/category'
import { AddCategoryUseCase } from '@/usecase/add_category_usecase'
import { GetAllCategoryUseCase } from '@/usecase/get_all_category_usecase'

import { useAuthContext } from './CurrentUserProvider'

type CategoryContextType = {
  categories: Category[]
  addCategory: (category: Category) => void
  deleteCategory: (id: string) => void
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
})

export const useCategoryContext = () => useContext(CategoryContext)

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const currentUser = useAuthContext().currentUser

  useEffect(() => {
    const fetch = async () => {
      const usecase = new GetAllCategoryUseCase()
      const { response } = await usecase.execute()
      setCategories(response)
    }
    fetch()
  }, [])

  const addCategory = async (category: Category) => {
    if (!currentUser) return
    const usecase = new AddCategoryUseCase()

    const { response } = await usecase.execute({
      name: category.getName(),
      babyId: currentUser.getBabyId(),
    })

    setCategories([...categories, response])
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.getId() !== id))
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
