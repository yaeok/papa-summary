import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

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
    this.authRepository = new AuthRepository()
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
