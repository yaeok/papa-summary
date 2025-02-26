import { Baby } from '@/domains/entities/baby'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'

import { UseCase, UseCaseInput, UseCaseOutput } from './interface/use_case'

interface UpdateBabyByIdUseCaseInput extends UseCaseInput {
  babyId: string
  name: string
  birthDate: string
}

interface UpdateBabyByIdUseCaseOutput extends UseCaseOutput {
  response: Baby
}

export class UpdateBabyByIdUseCase
  implements
    UseCase<UpdateBabyByIdUseCaseInput, Promise<UpdateBabyByIdUseCaseOutput>>
{
  private babyRepository: BabyRepository

  constructor() {
    this.babyRepository = new FirestoreBabyService()
  }

  async execute(
    input: UpdateBabyByIdUseCaseInput
  ): Promise<UpdateBabyByIdUseCaseOutput> {
    try {
      const { babyId, name, birthDate } = input
      await this.babyRepository.updateById({
        id: babyId,
        name: name,
        birthDate: new Date(birthDate),
      })

      const response = new Baby()
      response.setId(babyId)
      response.setName(name)
      response.setBirthDate(new Date(birthDate))

      return { response }
    } catch {
      throw new Error('Failed to update baby')
    }
  }
}
