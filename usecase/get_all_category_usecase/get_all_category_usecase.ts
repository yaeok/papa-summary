import { Category } from '@/domains/entities/category'
import { CategoryRepository } from '@/infrastructure/repository/category_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetAllCategoryUseCaseInput extends UseCaseInput {
  userId: string
}

interface GetAllCategoryUseCaseOutput extends UseCaseOutput {
  categories: Category[]
}

export class GetAllCategoryUseCase
  implements
    UseCase<GetAllCategoryUseCaseInput, Promise<GetAllCategoryUseCaseOutput>>
{
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  async execute(
    input: GetAllCategoryUseCaseInput
  ): Promise<GetAllCategoryUseCaseOutput> {
    const { userId } = input
    try {
      const categories = await this.categoryRepository.findByUserId({ userId })

      return { categories }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get categories')
    }
  }
}
