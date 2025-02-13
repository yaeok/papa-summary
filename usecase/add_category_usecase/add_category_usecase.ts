import { Category } from '@/domains/entities/category'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { FirestoreCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_category_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface AddCategoryUseCaseInput extends UseCaseInput {
  name: string
  babyId: string
  createdBy: string
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
    this.categoryRepository = new FirestoreCategoryService()
  }

  async execute(
    input: AddCategoryUseCaseInput
  ): Promise<AddCategoryUseCaseOutput> {
    const { name, babyId, createdBy } = input

    const category = new Category()
    category.setName(name)
    category.setBabyId(babyId)
    category.setCreatedBy(createdBy)

    const id = await this.categoryRepository.create({ category })

    category.setId(id)

    return { category }
  }
}
