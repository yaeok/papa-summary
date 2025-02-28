import { useState } from 'react'

import { Task } from '@/domains/entities/task'

import DateSection from '../../date_section/DateSection'
import Tag from '../../tag/tag'
import TaskModal from './item/TaskModal'

type props = {
  key: string
  task: Task
}

export default function TaskGridItem({ key, task }: props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  return (
    <>
      <div
        key={key}
        onClick={handleOpen}
        className='p-4 rounded-md shadow-md flex flex-col justify-between gap-4 cursor-pointer'
      >
        <div className='flex flex-row justify-between items-center gap-2'>
          <h2 className='text-lg font-semibold flex-1'>{task.getTitle()}</h2>
          <Tag timing={task.getTiming()} />
        </div>
        <div className='w-full flex justify-end'>
          <DateSection
            startDate={task.getStartDate()}
            endDate={task.getEndDate()}
          />
        </div>
      </div>
      <TaskModal task={task} isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
