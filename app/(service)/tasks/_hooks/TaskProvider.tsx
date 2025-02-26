'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Status } from '@/constants/Status'
import { Task } from '@/domains/entities/task'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GetAllTaskUseCase } from '@/usecase/get_all_task_usecase'

type TaskContextType = {
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  sortTaskByStartDate: () => Task[]
  loading: boolean
  timing: number
  setTiming: React.Dispatch<React.SetStateAction<number>>
  filteredTasks: Task[]
}

const TaskContext = createContext<TaskContextType>({
  addTask: () => {},
  updateTask: () => {},
  setTasks: () => {},
  sortTaskByStartDate: () => [],
  loading: true,
  timing: 0,
  setTiming: () => {},
  filteredTasks: [],
})

export const useTaskContext = () => useContext(TaskContext)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [timing, setTiming] = useState<number>(Status.getTaskTimingAll())
  const [loading, setLoading] = useState(true)
  const currentUser = useAuthContext().currentUser

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      if (!currentUser) return

      const babyId = currentUser.getBabyId()
      const usecase = new GetAllTaskUseCase()
      const { response } = await usecase.execute({ babyId })

      setTasks(response)

      setLoading(false)
    }
    fetch()
  }, [])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (task: Task) => {
    const newTasks = tasks.map((t) => {
      if (t.getId() === task.getId()) {
        return task
      }
      return t
    })
    setTasks(newTasks)
  }

  const sortTaskByStartDate = (): Task[] => {
    const sortTodos = tasks.sort((a, b) => {
      const startDateA = a.getStartDate()
      const startDateB = b.getStartDate()
      if (startDateA < startDateB) return -1
      if (startDateA > startDateB) return 1
      return 0
    })
    return sortTodos
  }

  const filteredTasks =
    timing !== Status.getTaskTimingAll()
      ? tasks
          .filter((task) => task.getTiming() === timing)
          .sort((a, b) => {
            const startDateA = a.getStartDate()
            const startDateB = b.getStartDate()
            if (startDateA < startDateB) return -1
            if (startDateA > startDateB) return 1
            return 0
          })
      : tasks.sort((a, b) => {
          const startDateA = a.getStartDate()
          const startDateB = b.getStartDate()
          if (startDateA < startDateB) return -1
          if (startDateA > startDateB) return 1
          return 0
        })

  return (
    <TaskContext.Provider
      value={{
        addTask,
        updateTask,
        setTasks,
        sortTaskByStartDate,
        loading,
        timing,
        setTiming,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
