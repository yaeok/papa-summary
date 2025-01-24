'use client'

import { useEffect, useState } from 'react'

import { Label } from '@/constants/Label'
import { Status } from '@/constants/Status'
import { Task } from '@/domains/Task'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GetAllTaskUseCase } from '@/usecase/GetAllTaskUseCase/GetAllTaskUseCase'

import AddTaskButton from './_components/AddTask/AddTaskButton'
import { useTaskContext } from './_hooks/TaskProvider'

const Page = () => {
  const taskContext = useTaskContext()
  const currentUser = useAuthContext().currentUser
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const usecase = new GetAllTaskUseCase()
      const response = await usecase.execute({ babyId: currentUser!.babyId })
      taskContext.setTasks(response.tasks)
      setLoading(false)
    }
    fetch()
  }, [])

  const handleTagColorByTiming = (timing: number) => {
    switch (timing) {
      case Status.getTaskTimingEarly():
        return 'bg-blue-500 text-white'
      case Status.getTaskTimingMiddle():
        return 'bg-yellow-500 text-white'
      case Status.getTaskTimingLate():
        return 'bg-red-500 text-white'
      case Status.getTaskTimingAfter():
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const handleTagNameByTiming = (timing: number) => {
    switch (timing) {
      case Status.getTaskTimingEarly():
        return Label.getTaskTimingEarly()
      case Status.getTaskTimingMiddle():
        return Label.getTaskTimingMiddle()
      case Status.getTaskTimingLate():
        return Label.getTaskTimingLate()
      case Status.getTaskTimingAfter():
        return Label.getTaskTimingAfter()
      default:
        return '未設定'
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
            onChange={(e) => console.log(e.target.value)}
            className='focus:outline-none'
          >
            <option value={Status.getTaskTimingAll()}>全て</option>
            <option value={Status.getTaskTimingEarly()}>
              {Label.getTaskTimingEarly()}
            </option>
            <option value={Status.getTaskTimingMiddle()}>
              {Label.getTaskTimingMiddle()}
            </option>
            <option value={Status.getTaskTimingLate()}>
              {Label.getTaskTimingLate()}
            </option>
            <option value={Status.getTaskTimingAfter()}>
              {Label.getTaskTimingAfter()}
            </option>
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
                        className={`px-4 py-2 rounded-full text-xs ${handleTagColorByTiming(
                          task.timing
                        )}`}
                      >
                        {handleTagNameByTiming(task.timing)}
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
