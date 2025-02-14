import { AuthRepository } from '@/domains/repositories/auth_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { isFirebaseError } from '@/infrastructure/service/firebase/exception/types/FirebaseAuthExceptionType'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface ResendEmailVerifyUseCaseInput extends UseCaseInput {}

interface ResendEmailVerifyUseCaseOutput extends UseCaseOutput {
  response: boolean
}

export class ResendEmailVerifyUseCase
  implements
    UseCase<
      ResendEmailVerifyUseCaseInput,
      Promise<ResendEmailVerifyUseCaseOutput>
    >
{
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthService()
  }

  async execute(): Promise<ResendEmailVerifyUseCaseOutput> {
    try {
      await this.authRepository.sendEmailVerification()

      return { response: true }
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
