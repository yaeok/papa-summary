// import { User } from '@/domains/User'
// import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
// import { Baby } from '@/domains/Baby'
// import { Category } from '@/domains/Category'
// import { UserRepository } from '@/infrastructure/repository/user_repository'
// import { AuthRepository } from '@/infrastructure/repository/auth_repository'

// interface GetInitialProfileUseCaseInput extends UseCaseInput {}

// interface GetInitialProfileUseCaseOutput extends UseCaseOutput {
//   userInfo: User
//   babyInfo: Baby
//   categories: Category[]
// }

// export class GetInitialProfileUseCase
//   implements
//     UseCase<
//       GetInitialProfileUseCaseInput,
//       Promise<GetInitialProfileUseCaseOutput>
//     >
// {

//   private userRepository: UserRepository
//   private authRepository: AuthRepository

//   constructor() {
//     this.userRepository = new UserRepository()
//     this.authRepository = new AuthRepository()
//   }
//   async execute(): Promise<void> {
//     try {
//       const user = await this.authRepository.getCurrentUser()

//       const userInfo = await this.userRepository.findById({ id: user.id })

//     }
//   }
// }
