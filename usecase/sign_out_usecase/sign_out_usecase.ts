import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { isFirebaseError } from '@/infrastructure/service/firebase/exception/types/FirebaseAuthExceptionType'

interface SignOutUseCaseInput extends UseCaseInput {}

interface SignOutUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<SignOutUseCaseOutput>>
{
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async execute(): Promise<SignOutUseCaseOutput> {
    try {
      await this.authRepository.signOut()

      return { result: true }
    } catch (error: any) {
      if (isFirebaseError(error)) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
