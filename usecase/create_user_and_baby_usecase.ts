import { Baby } from '@/domains/entities/baby'
import { Parent } from '@/domains/entities/parent'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { ParentRepository } from '@/domains/repositories/parent_repository'
import { UserRepository } from '@/domains/repositories/user_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'
import { FirestoreParentService } from '@/infrastructure/service/firebase/firestore/firestore_parent_service'
import { FirestoreUserService } from '@/infrastructure/service/firebase/firestore/firestore_user_service'

import { UseCase, UseCaseInput, UseCaseOutput } from './interface/use_case'

interface CreateUserAndBabyInfoUseCaseInput extends UseCaseInput {
  name: string
  parentType: number
  babyName: string
  babyBirthday: string
}

interface CreateUserAndBabyInfoUseCaseOutput extends UseCaseOutput {
  response: boolean
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
    this.authRepository = new AuthService()
    this.userRepository = new FirestoreUserService()
    this.babyRepository = new FirestoreBabyService()
    this.parentRepository = new FirestoreParentService()
  }

  async execute(
    args: CreateUserAndBabyInfoUseCaseInput
  ): Promise<CreateUserAndBabyInfoUseCaseOutput> {
    try {
      const { name, parentType, babyName, babyBirthday } = args

      const user = await this.authRepository.getCurrentUser()

      const userId = user.uid

      await this.userRepository.updateNameParentType({
        id: userId,
        name,
        parentType,
      })

      const birthDate = new Date(babyBirthday)

      const baby = new Baby()
      baby.setName(babyName)
      baby.setBirthDate(birthDate)

      const response = await this.babyRepository.create({ baby })

      const parent = new Parent()
      parent.setUserId(userId)
      parent.setBabyId(response.getId())

      await this.parentRepository.create({ parent })
      return { response: true }
    } catch (error) {
      return { response: false }
    }
  }
}
