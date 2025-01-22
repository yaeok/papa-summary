'use client'

import { useEffect, useState } from 'react'

import { tasks } from '@/data'
import { Task } from '@/domains/Task'
import { TaskStatus } from '@/types/TaskStatus'

import TaskCreateButton from './_components/TaskCreate/TaskCreateButton'

const Page = () => {
  const [todos, setTodos] = useState<Task[]>(tasks)
  useEffect(() => {
    initialFilterByTaskStatus()
    sortTaskByStartDate()
  }, [])
  const initialFilterByTaskStatus = () => {
    setTodos(tasks.filter((todo) => todo.status != TaskStatus.DONE))
  }
  const sortTaskByStartDate = () => {
    const sortTodos = todos.sort((a, b) => {
      if (a.startDate < b.startDate) return -1
      if (a.startDate > b.startDate) return 1
      return 0
    })
    setTodos(sortTodos)
  }
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
  const filterTaskStatusChanged = (status: TaskStatus) => {
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
    <div className='space-y-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-lg'>やることリスト</h1>
        <div className='flex flex-row gap-2'>
          <select
            name='task-select'
            id='task-select'
            onChange={(e) =>
              filterTaskStatusChanged(e.target.value as TaskStatus)
            }
            className='focus:outline-none'
          >
            <option value='all'>全て</option>
            <option value={TaskStatus.NOTSTARTED}>未着手</option>
            <option value={TaskStatus.DOING}>進行中</option>
            <option value={TaskStatus.DONE}>完了</option>
          </select>
          <TaskCreateButton />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
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
  )
}

export default Page
