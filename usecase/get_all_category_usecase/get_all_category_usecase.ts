import { Category } from '@/domains/entities/category'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { FirestoreCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_category_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetAllCategoryUseCaseInput extends UseCaseInput {
  userId: string
}

interface GetAllCategoryUseCaseOutput extends UseCaseOutput {
  response: Category[]
}

export class GetAllCategoryUseCase
  implements
    UseCase<GetAllCategoryUseCaseInput, Promise<GetAllCategoryUseCaseOutput>>
{
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new FirestoreCategoryService()
  }

  async execute(
    input: GetAllCategoryUseCaseInput
  ): Promise<GetAllCategoryUseCaseOutput> {
    try {
      const { userId } = input

      const result = await this.categoryRepository.findByUserId({ userId })

      const response = result.map((category) => {
        const response = new Category()
        response.setId(category.getId())
        response.setName(category.getName())
        response.setBabyId(category.getBabyId())
        response.setCreatedBy(category.getCreatedBy())
        response.setCreatedAt(category.getCreatedAt())
        return response
      })

      return { response }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get categories')
    }
  }
}
