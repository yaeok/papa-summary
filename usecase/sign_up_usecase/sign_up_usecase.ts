import { User } from '@/domains/entities/user'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { UserRepository } from '@/domains/repositories/user_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirebaseAuthException } from '@/infrastructure/service/firebase/exception/FirebaseAuthException'
import { FirestoreUserService } from '@/infrastructure/service/firebase/firestore/firestore_user_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface SignUpUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignUpUseCaseOutput extends UseCaseOutput {
  response: boolean
}

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, Promise<SignUpUseCaseOutput>>
{
  private authRepository: AuthRepository
  private userRepository: UserRepository

  constructor() {
    this.authRepository = new AuthService()
    this.userRepository = new FirestoreUserService()
  }

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const { email, password } = input
    try {
      const response = await this.authRepository.signUpWithEmail({
        email: email,
        password: password,
      })
      const user = new User()
      user.setId(response.user.uid)
      user.setEmail(email)

      await this.userRepository.create({ user })

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
