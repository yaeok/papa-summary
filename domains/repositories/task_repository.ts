import { Task } from '@/domains/entities/task'
import { TaskDB } from '@/infrastructure/data/task'

export interface TaskRepository {
  findAll(args: { babyId: string }): Promise<TaskDB[]>
  findById(args: { id: string }): Promise<TaskDB>
  create(args: { task: Task }): Promise<TaskDB>
  // update(args: { task: Task }): Promise<void>
  // delete(args: { id: string }): Promise<void>
}
