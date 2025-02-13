'use client'

import { createContext, useContext, useState } from 'react'

import { Task } from '@/domains/entities/task'

type TaskContextType = {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  sortTaskByStartDate: () => Task[]
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  setTasks: () => {},
  sortTaskByStartDate: () => [],
})

export const useTaskContext = () => useContext(TaskContext)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (task: Task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return task
      }
      return t
    })
    setTasks(newTasks)
  }

  const sortTaskByStartDate = (): Task[] => {
    const sortTodos = tasks.sort((a, b) => {
      if (a.startDate < b.startDate) return -1
      if (a.startDate > b.startDate) return 1
      return 0
    })
    return sortTodos
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        setTasks,
        sortTaskByStartDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
