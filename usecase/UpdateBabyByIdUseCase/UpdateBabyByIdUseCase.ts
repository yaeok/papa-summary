import { Baby } from '@/domains/entities/baby'
import { BabyRepository } from '@/infrastructure/repository/baby_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

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
    this.babyRepository = new BabyRepository()
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
