'use client'

import Loading from '@/components/Loading/Loading'
import { Task } from '@/domains/entities/task'

import { useTaskContext } from '../../_hooks/TaskProvider'
import TaskGridItem from './grid_item/TaskGridItem'

export default function TaskGrid() {
  const taskContext = useTaskContext()

  if (taskContext.loading) {
    return <Loading />
  } else {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {taskContext.filteredTasks.map((task: Task) => (
          <TaskGridItem key={task.getId()} task={task} />
        ))}
      </div>
    )
  }
}
