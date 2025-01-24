import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { BabyRepository } from '@/infrastructure/repository/baby_repository'
import { ParentRepository } from '@/infrastructure/repository/parent_repository'
import { UserRepository } from '@/infrastructure/repository/user_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface CreateUserAndBabyInfoUseCaseInput extends UseCaseInput {
  name: string
  parentType: number
  babyName: string
  babyBirthday: string
}

interface CreateUserAndBabyInfoUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class CreateUserAndBabyInfoUseCase
  implements
    UseCase<
      CreateUserAndBabyInfoUseCaseInput,
      Promise<CreateUserAndBabyInfoUseCaseOutput>
    >
{
  private authRepository: AuthRepository
  private userRepository: UserRepository
  private babyRepository: BabyRepository
  private parentRepository: ParentRepository

  constructor() {
    this.authRepository = new AuthRepository()
    this.userRepository = new UserRepository()
    this.babyRepository = new BabyRepository()
    this.parentRepository = new ParentRepository()
  }

  async execute(
    args: CreateUserAndBabyInfoUseCaseInput
  ): Promise<CreateUserAndBabyInfoUseCaseOutput> {
    try {
      const { name, parentType, babyName, babyBirthday } = args

      const user = await this.authRepository.getCurrentUser()

      await this.userRepository.updateFromNameParentType({
        id: user.id,
        name,
        parentType,
      })

      const responseBaby = await this.babyRepository.create({
        name: babyName,
        birthDate: new Date(babyBirthday),
      })

      await this.parentRepository.create({
        userId: user.id,
        babyId: responseBaby.id,
      })
      return { result: true }
    } catch (error) {
      return { result: false }
    }
  }
}
