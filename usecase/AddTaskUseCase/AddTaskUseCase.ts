import { Task } from '@/domains/Task'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { TaskRepository } from '@/infrastructure/repository/task_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface AddTaskUseCaseInput extends UseCaseInput {
  title: string
  content: string
  startDate: Date
  endDate: Date | null
}

interface AddTaskUseCaseOutput extends UseCaseOutput {
  result: Task
}

export class AddTaskUseCase
  implements UseCase<AddTaskUseCaseInput, Promise<AddTaskUseCaseOutput>>
{
  private taskRepository: TaskRepository
  private authRepository: AuthRepository

  constructor() {
    this.taskRepository = new TaskRepository()
    this.authRepository = new AuthRepository()
  }

  async execute(input: AddTaskUseCaseInput): Promise<AddTaskUseCaseOutput> {
    const { title, content, startDate, endDate } = input

    const user = await this.authRepository.getCurrentUser()

    const ownerId = user.id

    const result = await this.taskRepository.create({
      name: title,
      content: content,
      startDate: startDate,
      endDate: endDate,
      ownerId: ownerId,
    })

    return { result }
  }
}
