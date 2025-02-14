import { Baby } from '@/domains/entities/baby'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetBabyByIdUseCaseInput extends UseCaseInput {
  id: string
}

interface GetBabyByIdUseCaseOutput extends UseCaseOutput {
  response: Baby | null
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
      const result = await this.babyRepository.findById({ id })

      const response = new Baby()
      response.setId(result.getId())
      response.setName(result.getName())
      response.setBirthDate(result.getBirthDate())

      return { response }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get baby')
    }
  }
}
