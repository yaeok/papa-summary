import { Baby } from '@/domains/entities/baby'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'

interface GetBabyByIdUseCaseInput extends UseCaseInput {
  id: string
}

interface GetBabyByIdUseCaseOutput extends UseCaseOutput {
  baby: Baby | null
}

export class GetBabyByIdUseCase
  implements
    UseCase<GetBabyByIdUseCaseInput, Promise<GetBabyByIdUseCaseOutput>>
{
  private babyRepository: BabyRepository

  constructor() {
    this.babyRepository = new FirestoreBabyService()
  }

  async execute(
    input: GetBabyByIdUseCaseInput
  ): Promise<GetBabyByIdUseCaseOutput> {
    const { id } = input
    try {
      const response = await this.babyRepository.findById({ id })

      const baby = new Baby()
      baby.setId(response.getId())
      baby.setName(response.getName())
      baby.setBirthDate(response.getBirthDate())

      return { baby }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get baby')
    }
  }
}
