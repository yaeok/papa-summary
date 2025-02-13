import { Product } from '@/domains/entities/product'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { FirestoreProductService } from '@/infrastructure/service/firebase/firestore/firestore_product_service'

interface AddProductUseCaseInput extends UseCaseInput {
  name: string
  price: number
  content: string
  babyId: string
}

interface AddProductUseCaseOutput extends UseCaseOutput {
  result: Product
}

export class AddProductUseCase
  implements UseCase<AddProductUseCaseInput, Promise<AddProductUseCaseOutput>>
{
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new FirestoreProductService()
  }

  async execute(
    input: AddProductUseCaseInput
  ): Promise<AddProductUseCaseOutput> {
    const { name, price, content, babyId } = input

    const result = await this.productRepository.create({
      name,
      price,
      content,
      babyId,
    })

    return { result }
  }
}
