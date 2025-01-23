'use client'

import { useEffect, useState } from 'react'

import { Task } from '@/domains/Task'
import { TaskStatus } from '@/types/TaskStatus'
import { GetAllTaskUseCase } from '@/usecase/GetAllTaskUseCase/GetAllTaskUseCase'

import AddTaskButton from './_components/AddTask/AddTaskButton'
import { useTaskContext } from './_hooks/TaskProvider'

const Page = () => {
  const taskContext = useTaskContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const usecase = new GetAllTaskUseCase()
      const response = await usecase.execute()
      taskContext.setTasks(response.tasks)
      setLoading(false)
    }
    fetch()
  }, [])

  const handleTagColorByStatus = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.NOTSTARTED:
        return 'bg-red-400'
      case TaskStatus.DOING:
        return 'bg-green-400'
      case TaskStatus.DONE:
        return 'bg-gray-400'
    }
  }

  const handleTagNameByStatus = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.NOTSTARTED:
        return '未着手'
      case TaskStatus.DOING:
        return '進行中'
      case TaskStatus.DONE:
        return '完了'
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
              taskContext.filterTaskStatusChanged(e.target.value as TaskStatus)
            }
            className='focus:outline-none'
          >
            <option value='all'>全て</option>
            <option value={TaskStatus.NOTSTARTED}>未着手</option>
            <option value={TaskStatus.DOING}>進行中</option>
            <option value={TaskStatus.DONE}>完了</option>
          </select>
          <AddTaskButton />
        </div>
      </div>

      {(() => {
        if (loading) {
          return <div>読み込み中...</div>
        } else {
          return (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {taskContext.tasks.map((task: Task) => (
                <div
                  key={task.id}
                  onClick={() => console.log(task)}
                  className='p-4 rounded-md shadow-md flex flex-col justify-between gap-4'
                >
                  <div className='flex flex-row justify-between items-center gap-2'>
                    <h2 className='text-lg font-semibold flex-1'>
                      {task.title}
                    </h2>
                    {
                      <span
                        className={`px-4 py-2 rounded-full text-xs ${handleTagColorByStatus(
                          task.status
                        )}`}
                      >
                        {handleTagNameByStatus(task.status)}
                      </span>
                    }
                  </div>
                  <p className='px-2 text-sm break-words'>{task.content}</p>
                  <div className='text-end text-sm'>
                    {task.startDate.toLocaleDateString()} 〜{' '}
                    {task.endDate?.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      })()}
    </div>
  )
}

export default Page
