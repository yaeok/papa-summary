import { TaskStatus } from '@/types/TaskStatus'

export class TaskOutput {
  id: string
  title: string
  content: string
  startDate: Date
  endDate: Date | null
  status: TaskStatus
  ownerId: string
  createdAt: Date
  updatedAt: Date | null

  constructor(args: {
    id: string
    title: string
    content: string
    startDate: Date
    endDate: Date | null
    status: TaskStatus
    ownerId: string
    createdAt: Date
    updatedAt: Date | null
  }) {
    this.id = args.id
    this.title = args.title
    this.content = args.content
    this.startDate = args.startDate
    this.endDate = args.endDate
    this.status = args.status
    this.ownerId = args.ownerId
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
  }
}
