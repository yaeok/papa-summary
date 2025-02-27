import { Baby } from '@/domains/entities/baby'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { ParentRepository } from '@/domains/repositories/parent_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'
import { FirestoreParentService } from '@/infrastructure/service/firebase/firestore/firestore_parent_service'

import { UseCase, UseCaseInput } from './interface/use_case'

interface InitialDisplayProfilePageUseCaseInput extends UseCaseInput {}

interface InitialDisplayProfilePageUseCaseOutput {
  response: {
    baby: Baby | null
  }
}

export class InitialDisplayProfilePageUseCase
  implements
    UseCase<
      InitialDisplayProfilePageUseCaseInput,
      Promise<InitialDisplayProfilePageUseCaseOutput>
    >
{
  private authRepository: AuthRepository
  private parentRepository: ParentRepository
  private babyRepository: BabyRepository

  constructor() {
    this.authRepository = new AuthService()
    this.parentRepository = new FirestoreParentService()
    this.babyRepository = new FirestoreBabyService()
  }

  async execute(): Promise<InitialDisplayProfilePageUseCaseOutput> {
    try {
      const authUser = await this.authRepository.getCurrentUser()

      const userId = authUser.uid

      const parent = await this.parentRepository.findByUserId({
        userId: userId,
      })

      if (parent !== null) {
        const babyId = parent.getBabyId()
        const resBaby = await this.babyRepository.findById({
          id: babyId,
        })

        const baby = new Baby()
        baby.setId(resBaby.getId())
        baby.setName(resBaby.getName())
        baby.setBirthDate(resBaby.getBirthDate())

        return {
          response: {
            baby: baby,
          },
        }
      } else {
        return {
          response: {
            baby: null,
          },
        }
      }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
