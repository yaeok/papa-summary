import { Task } from '@/domains/Task'
import { DocumentData } from '@firebase/firestore'

export class TaskDTO {
  id: string
  title: string
  content: string
  startDate: Date
  endDate: Date | null
  timing: number
  babyId: string
  completedAt: Date | null
  createdAt: Date
  updatedAt?: Date | null

  constructor(args: {
    id: string
    title: string
    content: string
    startDate: Date
    endDate: Date | null
    timing: number
    babyId: string
    completedAt: Date | null
    createdAt: Date
    updatedAt?: Date | null
  }) {
    this.id = args.id
    this.title = args.title
    this.content = args.content
    this.startDate = args.startDate
    this.endDate = args.endDate
    this.timing = args.timing
    this.babyId = args.babyId
    this.completedAt = args.completedAt
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
  }

  static fromDocumentData(data: DocumentData, id: string): TaskDTO {
    return new TaskDTO({
      id: id,
      title: data.name,
      content: data.content,
      startDate: data.startDate.toDate(),
      endDate: data.endDate !== null ? data.endDate.toDate() : null,
      timing: data.timing,
      babyId: data.babyId,
      completedAt: data.completedAt !== null ? data.completedAt.toDate() : null,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt !== null ? data.updatedAt.toDate() : null,
    })
  }

  static fromTask(task: Task, updatedAt?: Date): TaskDTO {
    return new TaskDTO({
      id: task.id,
      title: task.title,
      content: task.content,
      startDate: task.startDate,
      endDate: task.endDate,
      babyId: task.babyId,
      timing: task.timing,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: updatedAt ?? null,
    })
  }

  toDocumentData(): DocumentData {
    return {
      name: this.title,
      content: this.content,
      startDate: this.startDate,
      endDate: this.endDate,
      timing: this.timing,
      babyId: this.babyId,
      completedAt: this.completedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
