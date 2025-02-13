import { User } from '@/domains/entities/user'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { UserRepository } from '@/infrastructure/repository/user_repository'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface SignUpUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignUpUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, Promise<SignUpUseCaseOutput>>
{
  private authRepository: AuthRepository
  private userRepository: UserRepository

  constructor() {
    this.authRepository = new AuthRepository()
    this.userRepository = new UserRepository()
  }

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const { email, password } = input
    try {
      const response = await this.authRepository.signUp({
        email: email,
        password: password,
      })
      const user = new User({
        id: response,
        email: email,
        name: '',
        babyId: '',
        parentType: 0,
        createdAt: new Date(),
      })

      await this.userRepository.create(user)

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
