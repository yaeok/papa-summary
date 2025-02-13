import { Task } from '@/domains/entities/task'
import { TaskRepository } from '@/infrastructure/repository/task_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetAllTaskUseCaseInput extends UseCaseInput {
  babyId: string
}

interface GetAllTaskUseCaseOutput extends UseCaseOutput {
  tasks: Task[]
}

export class GetAllTaskUseCase
  implements UseCase<GetAllTaskUseCaseInput, Promise<GetAllTaskUseCaseOutput>>
{
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  async execute(
    input: GetAllTaskUseCaseInput
  ): Promise<GetAllTaskUseCaseOutput> {
    const { babyId } = input

    const tasks = await this.taskRepository.findAll({ babyId })

    return { tasks }
  }
}
