import { AuthRepository } from '@/domains/repositories/auth_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from './interface/use_case'

type ResendEmailVerifyUseCaseInput = UseCaseInput

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
    } catch (error) {
      if (error instanceof FirebaseAuthException) {
        throw new FirebaseAuthException(error.message, error.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }
}
