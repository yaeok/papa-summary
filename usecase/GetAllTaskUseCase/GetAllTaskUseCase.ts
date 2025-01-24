import { Task } from '@/domains/Task'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { TaskRepository } from '@/infrastructure/repository/task_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface GetAllTaskUseCaseInput extends UseCaseInput {}

interface GetAllTaskUseCaseOutput extends UseCaseOutput {
  tasks: Task[]
}

export class GetAllTaskUseCase
  implements UseCase<GetAllTaskUseCaseInput, Promise<GetAllTaskUseCaseOutput>>
{
  private taskRepository: TaskRepository
  private authRepository: AuthRepository

  constructor() {
    this.taskRepository = new TaskRepository()
    this.authRepository = new AuthRepository()
  }

  async execute(): Promise<GetAllTaskUseCaseOutput> {
    const user = await this.authRepository.getCurrentUser()

    const babyId = user.id

    const tasks = await this.taskRepository.findAll({ babyId })

    return { tasks }
  }
}
