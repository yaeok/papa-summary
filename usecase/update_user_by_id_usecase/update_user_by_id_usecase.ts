import { UserRepository } from '@/infrastructure/repository/user_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface UpdateUserByIdUseCaseInpur extends UseCaseInput {
  userId: string
  name: string
  parentType: number
}

interface UpdateUserByIdUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class UpdateUserByIdUseCase
  implements
    UseCase<UpdateUserByIdUseCaseInpur, Promise<UpdateUserByIdUseCaseOutput>>
{
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(
    input: UpdateUserByIdUseCaseInpur
  ): Promise<UpdateUserByIdUseCaseOutput> {
    const { userId, name, parentType } = input

    await this.userRepository.updateNameParentType({
      id: userId,
      name,
      parentType,
    })

    return { result: true }
  }
}
