import { Baby } from '@/domains/Baby'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'
import { BabyRepository } from '@/infrastructure/repository/baby_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface GetBabyByIdUseCaseInput extends UseCaseInput {
  id: string
}

interface GetBabyByIdUseCaseOutput extends UseCaseOutput {
  baby: Baby
}

export class GetBabyByIdUseCase
  implements
    UseCase<GetBabyByIdUseCaseInput, Promise<GetBabyByIdUseCaseOutput>>
{
  private babyRepository: BabyRepository

  constructor() {
    this.babyRepository = new BabyRepository()
  }

  async execute(
    input: GetBabyByIdUseCaseInput
  ): Promise<GetBabyByIdUseCaseOutput> {
    const { id } = input
    try {
      const baby = await this.babyRepository.findById({ id })

      return { baby }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get baby')
    }
  }
}
