import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

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
    } catch (error) {
      console.error(error)
      return { result: false }
    }
  }
}
