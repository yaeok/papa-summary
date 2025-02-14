import { AuthRepository } from '@/domains/repositories/auth_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface SignInUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignInUseCaseOutput extends UseCaseOutput {
  response: boolean
}

export class SignInUseCase
  implements UseCase<SignInUseCaseInput, Promise<SignInUseCaseOutput>>
{
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthService()
  }

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const { email, password } = input
    try {
      await this.authRepository.signInWithEmail({
        email: email,
        password: password,
      })

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
