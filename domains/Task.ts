import { TaskDTO } from '@/infrastructure/data/TaskDTO'

export class Task {
  id: string
  title: string
  content: string
  startDate: Date
  endDate: Date | null
  babyId: string
  timing: number
  completedAt: Date | null
  createdAt: Date

  constructor(args: {
    id: string
    title: string
    content: string
    startDate: Date
    endDate: Date | null
    babyId: string
    timing: number
    completedAt: Date | null
    createdAt: Date
  }) {
    this.id = args.id
    this.title = args.title
    this.content = args.content
    this.startDate = args.startDate
    this.endDate = args.endDate
    this.babyId = args.babyId
    this.timing = args.timing
    this.completedAt = args.completedAt
    this.createdAt = args.createdAt
  }

  static fromTaskDTO(taskDTO: TaskDTO): Task {
    return new Task({
      id: taskDTO.id,
      title: taskDTO.title,
      content: taskDTO.content,
      startDate: taskDTO.startDate,
      endDate: taskDTO.endDate,
      babyId: taskDTO.babyId,
      timing: taskDTO.timing,
      completedAt: taskDTO.completedAt,
      createdAt: taskDTO.createdAt,
    })
  }
}
