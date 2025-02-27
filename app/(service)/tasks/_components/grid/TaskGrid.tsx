'use client'

import Loading from '@/components/Loading/Loading'
import { Task } from '@/domains/entities/task'

import { useTaskListPageContext } from '../../_hooks/TaskListPageProvider'
import TaskGridItem from './grid_item/TaskGridItem'

export default function TaskGrid() {
  const taskListPageContext = useTaskListPageContext()

  if (taskListPageContext.loading) {
    return <Loading />
  } else {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {taskListPageContext.filteredTasks.map((task: Task) => (
          <TaskGridItem key={task.getId()} task={task} />
        ))}
      </div>
    )
  }
}
