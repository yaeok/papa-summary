import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { AuthRepository } from '@/domains/repositories/auth_repository'

interface ResendEmailVerifyUseCaseInput extends UseCaseInput {}

interface ResendEmailVerifyUseCaseOutput extends UseCaseOutput {
  result: boolean
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

      return { result: true }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
