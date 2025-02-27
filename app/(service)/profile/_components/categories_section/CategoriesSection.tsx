'use client'

import { useCategoryContext } from '@/providers/CategoryProvider'

import AddCategoryButton from './add_category/AddCategoryButton'

export default function CategoriesSection() {
  const categoryContext = useCategoryContext()

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>カテゴリー管理</h1>
      <div className='w-full space-y-2'>
        {categoryContext.categories.map((category) => (
          <div key={category.getId()} className='flex flex-row justify-between'>
            <p>{category.getName()}</p>
            <button className='px-2 py-1 rounded-full bg-red-500 text-white'>
              削除
            </button>
          </div>
        ))}
      </div>
      <AddCategoryButton />
    </div>
  )
}
