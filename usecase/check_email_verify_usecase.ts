import { AuthRepository } from '@/domains/repositories/auth_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from './interface/use_case'

interface CheckEmailVerifyUseCaseInput extends UseCaseInput {}

interface CheckEmailVerifyUseCaseOutput extends UseCaseOutput {
  response: boolean
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
    this.authRepository = new AuthService()
  }

  async execute(): Promise<CheckEmailVerifyUseCaseOutput> {
    try {
      const response = await this.authRepository.checkEmailVerification()

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
