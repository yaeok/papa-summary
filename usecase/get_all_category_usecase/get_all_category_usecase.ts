import { Category } from '@/domains/entities/category'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_category_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetAllCategoryUseCaseInput extends UseCaseInput {}

interface GetAllCategoryUseCaseOutput extends UseCaseOutput {
  response: Category[]
}

export class GetAllCategoryUseCase
  implements
    UseCase<GetAllCategoryUseCaseInput, Promise<GetAllCategoryUseCaseOutput>>
{
  private authRepository: AuthRepository
  private categoryRepository: CategoryRepository

  constructor() {
    this.authRepository = new AuthService()
    this.categoryRepository = new FirestoreCategoryService()
  }

  async execute(): Promise<GetAllCategoryUseCaseOutput> {
    try {
      const currentUser = await this.authRepository.getCurrentUser()

      const userId = currentUser.uid

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
