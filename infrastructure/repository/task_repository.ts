import { Task } from '@/domains/Task'

import { FirestoreTaskService } from '../service/firebase/firestore/firestore_task_service'

export class TaskRepository {
  private service: FirestoreTaskService

  constructor() {
    this.service = new FirestoreTaskService()
  }

  async findAll(args: { babyId: string }): Promise<Task[]> {
    const result = await this.service.findAll(args)

    const response = result.map((task) => {
      return Task.fromTaskDTO(task)
    })

    return response
  }

  async create(args: {
    name: string
    content: string
    startDate: Date
    endDate: Date | null
    babyId: string
  }): Promise<Task> {
    const result = await this.service.create(args)

    const response = Task.fromTaskDTO(result)

    return response
  }
}
