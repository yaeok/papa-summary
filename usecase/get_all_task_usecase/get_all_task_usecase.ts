import { Task } from '@/domains/entities/task'
import { TaskRepository } from '@/domains/repositories/task_repository'
import { FirestoreTaskService } from '@/infrastructure/service/firebase/firestore/firestore_task_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetAllTaskUseCaseInput extends UseCaseInput {
  babyId: string
}

interface GetAllTaskUseCaseOutput extends UseCaseOutput {
  response: Task[]
}

export class GetAllTaskUseCase
  implements UseCase<GetAllTaskUseCaseInput, Promise<GetAllTaskUseCaseOutput>>
{
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new FirestoreTaskService()
  }

  async execute(
    input: GetAllTaskUseCaseInput
  ): Promise<GetAllTaskUseCaseOutput> {
    const { babyId } = input

    const tasks = await this.taskRepository.findAll({ babyId })

    const response = tasks.map((task) => {
      const t = new Task()
      t.setId(task.getId())
      t.setTitle(task.getTitle())
      t.setContent(task.getContent())
      t.setStartDate(task.getStartDate())
      t.setEndDate(task.getEndDate())
      t.setCompletedAt(task.getCompletedAt())
      t.setBabyId(task.getBabyId())
      t.setCreatedBy(task.getCreatedBy())
      t.setTiming(task.getTiming())
      t.setCreatedAt(task.getCreatedAt())
      return t
    })

    return { response }
  }
}
