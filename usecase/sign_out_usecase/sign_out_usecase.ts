import { AuthRepository } from '@/domains/repositories/auth_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { isFirebaseError } from '@/infrastructure/service/firebase/exception/types/FirebaseAuthExceptionType'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface SignOutUseCaseInput extends UseCaseInput {}

interface SignOutUseCaseOutput extends UseCaseOutput {
  response: boolean
}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<SignOutUseCaseOutput>>
{
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthService()
  }

  async execute(): Promise<SignOutUseCaseOutput> {
    try {
      await this.authRepository.signOut()

      return { response: true }
    } catch (error: any) {
      if (isFirebaseError(error)) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
