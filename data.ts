import { Product } from './domains/Product'
import { Task } from './domains/Task'
import { TaskStatus } from './types/TaskStatus'

// id: string
// name: string
// price: number
// categories: Category[]
// createdAt: Date

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
  },
  {
    id: '2',
    name: 'Product 2',
    price: 2000,
    content: 'content2',
    categories: [],
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Product 3',
    price: 3000,
    content: 'content3',
    categories: [],
    createdAt: new Date(),
  },
]
