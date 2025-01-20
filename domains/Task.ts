import { TaskStatus } from '@/types/TaskStatus'

export class Task {
  id: string
  title: string
  content: string
  startDate: Date
  endDate: Date | null
  status: TaskStatus
  createdAt: Date

  constructor(args: {
    id: string
    title: string
    content: string
    startDate: Date
    endDate: Date | null
    status: TaskStatus
    createdAt: Date
  }) {
    this.id = args.id
    this.title = args.title
    this.content = args.content
    this.startDate = args.startDate
    this.endDate = args.endDate
    this.status = args.status
    this.createdAt = args.createdAt
  }
}
