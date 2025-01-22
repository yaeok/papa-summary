import { Product } from './domains/Product'
import { Task } from './domains/Task'
import { TaskStatus } from './types/TaskStatus'

// id: string
// name: string
// price: number
// categories: Category[]
// createdAt: Date
// updatedAt: Date | null

export const products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 1000,
    content: 'content1',
    categories: [
      {
        id: '1',
        name: 'Category 1',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Category 2',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 2000,
    content: 'content2',
    categories: [],
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: '3',
    name: 'Product 3',
    price: 3000,
    content: 'content3',
    categories: [],
    createdAt: new Date(),
    updatedAt: null,
  },
]

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    content: 'content1content1content1content1content1content1content1content1',
    startDate: new Date(),
    endDate: null,
    status: TaskStatus.DOING,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Task 2',
    content: 'content2',
    startDate: new Date(),
    endDate: null,
    status: TaskStatus.DONE,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Task 3',
    content: 'content3',
    startDate: new Date(),
    endDate: null,
    status: TaskStatus.NOTSTARTED,
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Task 4',
    content: 'content4',
    startDate: new Date(),
    endDate: null,
    status: TaskStatus.NOTSTARTED,
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Task 5',
    content: 'content5',
    startDate: new Date(),
    endDate: null,
    status: TaskStatus.DONE,
    createdAt: new Date(),
  },
]
