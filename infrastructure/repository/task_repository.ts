import { Task } from '@/domains/Task'

import { FirestoreTaskService } from '../service/firebase/firestore/firestore_task_service'

export class TaskRepository {
  private service: FirestoreTaskService

  constructor() {
    this.service = new FirestoreTaskService()
  }

  async findAll(args: { ownerId: string }): Promise<Task[]> {
    const result = await this.service.findAll(args)

    const response = result.map((task) => {
      return new Task({
        id: task.id,
        title: task.title,
        content: task.content,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
        owner: task.ownerId,
        createdAt: task.createdAt,
      })
    })

    return response
  }

  async create(args: {
    name: string
    content: string
    startDate: Date
    endDate: Date | null
    ownerId: string
  }): Promise<Task> {
    const result = await this.service.create(args)

    const response = new Task({
      id: result.id,
      title: result.title,
      content: result.content,
      startDate: result.startDate,
      endDate: result.endDate,
      status: result.status,
      owner: result.ownerId,
      createdAt: result.createdAt,
    })

    return response
  }
}
