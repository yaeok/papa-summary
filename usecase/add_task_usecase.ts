import { Task } from '@/domains/entities/task'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { TaskRepository } from '@/domains/repositories/task_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreTaskService } from '@/infrastructure/service/firebase/firestore/firestore_task_service'

import { UseCase, UseCaseInput, UseCaseOutput } from './interface/use_case'

interface AddTaskUseCaseInput extends UseCaseInput {
  title: string
  content: string
  startDate: Date
  endDate: Date | null
  timing: number
  babyId: string
}

interface AddTaskUseCaseOutput extends UseCaseOutput {
  response: Task
}

export class AddTaskUseCase
  implements UseCase<AddTaskUseCaseInput, Promise<AddTaskUseCaseOutput>>
{
  private taskRepository: TaskRepository
  private authRepository: AuthRepository

  constructor() {
    this.taskRepository = new FirestoreTaskService()
    this.authRepository = new AuthService()
  }

  async execute(input: AddTaskUseCaseInput): Promise<AddTaskUseCaseOutput> {
    const { title, content, startDate, endDate, timing, babyId } = input

    const user = await this.authRepository.getCurrentUser()

    const task = new Task()
    task.setTitle(title)
    task.setContent(content)
    task.setStartDate(startDate)
    task.setEndDate(endDate)
    task.setTiming(timing)
    task.setBabyId(babyId)
    task.setCreatedBy(user.uid)

    const result = await this.taskRepository.create({ task })

    const response = new Task()
    response.setId(result.getId())
    response.setTitle(result.getTitle())
    response.setContent(result.getContent())
    response.setStartDate(result.getStartDate())
    response.setEndDate(result.getEndDate())
    response.setTiming(result.getTiming())
    response.setBabyId(result.getBabyId())
    response.setCompletedAt(result.getCompletedAt())
    response.setCreatedBy(result.getCreatedBy())
    response.setCreatedAt(result.getCreatedAt())

    return { response }
  }
}
