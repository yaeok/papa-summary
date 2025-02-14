import { Category } from '@/domains/entities/category'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_category_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface AddCategoryUseCaseInput extends UseCaseInput {
  name: string
  babyId: string
}

interface AddCategoryUseCaseOutput extends UseCaseOutput {
  response: Category
}

export class AddCategoryUseCase
  implements
    UseCase<AddCategoryUseCaseInput, Promise<AddCategoryUseCaseOutput>>
{
  private categoryRepository: CategoryRepository
  private authRepository: AuthRepository

  constructor() {
    this.categoryRepository = new FirestoreCategoryService()
    this.authRepository = new AuthService()
  }

  async execute(
    input: AddCategoryUseCaseInput
  ): Promise<AddCategoryUseCaseOutput> {
    const { name, babyId } = input

    const user = await this.authRepository.getCurrentUser()

    const response = new Category()
    response.setName(name)
    response.setBabyId(babyId)
    response.setCreatedBy(user.uid)

    const id = await this.categoryRepository.create({ category: response })

    response.setId(id)

    return { response }
  }
}
