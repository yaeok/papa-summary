import { Task } from '@/domains/Task'
import { TaskRepository } from '@/infrastructure/repository/task_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface AddTaskUseCaseInput extends UseCaseInput {
  title: string
  content: string
  startDate: Date
  endDate: Date | null
  timing: number
  babyId: string
}

interface AddTaskUseCaseOutput extends UseCaseOutput {
  result: Task
}

export class AddTaskUseCase
  implements UseCase<AddTaskUseCaseInput, Promise<AddTaskUseCaseOutput>>
{
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  async execute(input: AddTaskUseCaseInput): Promise<AddTaskUseCaseOutput> {
    const { title, content, startDate, endDate, timing, babyId } = input

    const result = await this.taskRepository.create({
      name: title,
      content: content,
      startDate: startDate,
      endDate: endDate,
      timing: timing,
      babyId: babyId,
    })

    return { result }
  }
}
