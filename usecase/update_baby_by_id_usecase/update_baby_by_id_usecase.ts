import { Baby } from '@/domains/entities/baby'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { FirestoreBabyService } from '@/infrastructure/service/firebase/firestore/firestore_baby_service'

interface UpdateBabyByIdUseCaseInput extends UseCaseInput {
  babyId: string
  name: string
  birthDate: string
}

interface UpdateBabyByIdUseCaseOutput extends UseCaseOutput {
  baby: Baby
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
    await this.babyRepository.updateById({
      id: input.babyId,
      name: input.name,
      birthDate: new Date(input.birthDate),
    })

    const baby = new Baby({
      id: input.babyId,
      name: input.name,
      birthDate: new Date(input.birthDate),
    })

    return { baby }
  }
}
