import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface CheckEmailVerifyUseCaseInput extends UseCaseInput {}

interface CheckEmailVerifyUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class CheckEmailVerifyUseCase
  implements
    UseCase<
      CheckEmailVerifyUseCaseInput,
      Promise<CheckEmailVerifyUseCaseOutput>
    >
{
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async execute(): Promise<CheckEmailVerifyUseCaseOutput> {
    try {
      const result = await this.authRepository.checkEmailVerification()

      return { result }
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
