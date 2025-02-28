import { User } from '@/domains/entities/user'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { ParentRepository } from '@/domains/repositories/parent_repository'
import { UserRepository } from '@/domains/repositories/user_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'
import { FirestoreParentService } from '@/infrastructure/service/firebase/firestore/firestore_parent_service'
import { FirestoreUserService } from '@/infrastructure/service/firebase/firestore/firestore_user_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../interface/use_case'

type GetCurrentUserUserCaseInput = UseCaseInput

interface GetCurrentUserUserCaseOutput extends UseCaseOutput {
  response: User
}

export class GetCurrentUserUseCase
  implements
    UseCase<GetCurrentUserUserCaseInput, Promise<GetCurrentUserUserCaseOutput>>
{
  private authRepository: AuthRepository
  private userRepository: UserRepository
  private parentRepository: ParentRepository
  private babyRepository: BabyRepository

  constructor() {
    this.authRepository = new AuthService()
    this.userRepository = new FirestoreUserService()
    this.parentRepository = new FirestoreParentService()
    this.babyRepository = new FirestoreBabyService()
  }

  async execute(): Promise<GetCurrentUserUserCaseOutput> {
    try {
      const authUser = await this.authRepository.getCurrentUser()

      const userId = authUser.uid

      const user = await this.userRepository.findById({ id: userId })

      const response = new User()
      response.setId(user.getId())
      response.setName(user.getName())
      response.setEmail(user.getEmail())
      response.setParentType(user.getParentType())
      response.setCreatedAt(user.getCreatedAt())

      const parent = await this.parentRepository.findByUserId({
        userId: userId,
      })

      if (parent !== null) {
        const babyId = parent.getBabyId()
        const baby = await this.babyRepository.findById({
          id: babyId,
        })
        response.setBabyId(baby.getId())
      } else {
        response.setBabyId('')
      }

      return { response }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
