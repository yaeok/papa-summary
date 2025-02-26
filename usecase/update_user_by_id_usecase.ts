import { UserRepository } from '@/domains/repositories/user_repository'
import { FirestoreUserService } from '@/infrastructure/service/firebase/firestore/firestore_user_service'

import { UseCase, UseCaseInput, UseCaseOutput } from './interface/use_case'

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
    this.userRepository = new FirestoreUserService()
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
