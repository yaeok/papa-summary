'use client'

import { useState } from 'react'

import { products, tasks } from '@/data'
import { Product } from '@/domains/Product'
import { Task } from '@/domains/Task'
import { TaskStatus } from '@/types/TaskStatus'

const Page = () => {
  const [todos, setTodos] = useState<Task[]>(tasks)
  const handleColorChange = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.NOTSTARTED:
        return 'bg-red-50'
      case TaskStatus.DOING:
        return 'bg-yellow-50'
      case TaskStatus.DONE:
        return 'bg-gray-50'
    }
  }
  const handleTaskStatusChanged = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.NOTSTARTED:
        setTodos(tasks.filter((todo) => todo.status === TaskStatus.NOTSTARTED))
        break
      case TaskStatus.DOING:
        setTodos(tasks.filter((todo) => todo.status === TaskStatus.DOING))
        break
      case TaskStatus.DONE:
        setTodos(tasks.filter((todo) => todo.status === TaskStatus.DONE))
        break
      case 'all':
        setTodos(tasks)
        break
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='p-8 rounded-lg border-2 border-gray-500 space-y-4'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-lg'>やることリスト</h1>
          <div className='space-x-4'>
            <select
              name='task-select'
              id='task-select'
              onChange={(e) =>
                handleTaskStatusChanged(e.target.value as TaskStatus)
              }
              className='focus:outline-none'
            >
              <option value='all'>全て</option>
              <option value={TaskStatus.NOTSTARTED}>未着手</option>
              <option value={TaskStatus.DOING}>進行中</option>
              <option value={TaskStatus.DONE}>完了</option>
            </select>
            <button
              className='bg-blue-500 text-white rounded-full px-4 py-1 shadow-md
            hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
            >
              登録
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {todos.map((todo: Task) => (
            <div
              key={todo.id}
              className={`p-4 aspect-2/1 rounded-lg shadow-md flex flex-col justify-between ${handleColorChange(
                todo.status
              )}`}
            >
              <div className='space-y-2'>
                <div className='flex flex-row justify-between'>
                  <h2 className='text-lg font-semibold'>{todo.title}</h2>
                  <input
                    type='checkbox'
                    disabled={todo.status === TaskStatus.DONE}
                    defaultChecked={todo.status === TaskStatus.DONE}
                    className={`
                    h-4 w-4 text-blue-500 border border-gray-100 rounded-full cursor-pointer
                    checked:bg-purple-500 checked:border-transparent checked:text-white
                    focus:ring-blue-500 focus:ring-2 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  />
                </div>
                <p className='overflow-hidden'>{todo.content}</p>
              </div>
              <div>
                {todo.startDate.toLocaleDateString()} 〜{' '}
                {todo.endDate?.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='p-8 rounded-lg border-2 border-gray-500 space-y-4'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-lg'>かうものリスト</h1>
          <button
            className='bg-blue-500 text-white rounded-full px-4 py-1 shadow-md 
            hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
          >
            登録
          </button>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {products.map((product: Product) => (
            <div
              key={product.id}
              className='p-4 aspect-3/4 border-2 bg-white rounded-lg shadow-md flex flex-col justify-between'
            >
              <div className='space-y-2'>
                <h2 className='text-lg font-semibold'>{product.name}</h2>
                <p>{product.content}</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className='text-xs bg-gray-200 rounded-full px-2 py-1'
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <div className='w-full text-end'>{product.price}円</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
