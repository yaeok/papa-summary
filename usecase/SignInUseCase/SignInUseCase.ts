import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface SignInUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignInUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignInUseCase
  implements UseCase<SignInUseCaseInput, Promise<SignInUseCaseOutput>>
{
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const { email, password } = input
    try {
      await this.authRepository.signIn({
        email: email,
        password: password,
      })

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
