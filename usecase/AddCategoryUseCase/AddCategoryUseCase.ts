import { Category } from '@/domains/Category'
import { CategoryRepository } from '@/infrastructure/repository/category_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface AddCategoryUseCaseInput extends UseCaseInput {
  userId: string
  name: string
}

interface AddCategoryUseCaseOutput extends UseCaseOutput {
  category: Category
}

export class AddCategoryUseCase
  implements
    UseCase<AddCategoryUseCaseInput, Promise<AddCategoryUseCaseOutput>>
{
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  async execute(
    input: AddCategoryUseCaseInput
  ): Promise<AddCategoryUseCaseOutput> {
    const { name, userId } = input

    const result = await this.categoryRepository.create({
      name,
      userId,
    })

    const category = new Category({ id: result, name, createdAt: new Date() })

    return { category }
  }
}
