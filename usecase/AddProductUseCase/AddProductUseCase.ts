import { Product } from '@/domains/Product'
import { ProductRepository } from '@/infrastructure/repository/product_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'

interface AddProductUseCaseInput extends UseCaseInput {
  name: string
  price: number
  content: string
}

interface AddProductUseCaseOutput extends UseCaseOutput {
  result: Product
}

export class AddProductUseCase
  implements UseCase<AddProductUseCaseInput, Promise<AddProductUseCaseOutput>>
{
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository()
  }

  async execute(
    input: AddProductUseCaseInput
  ): Promise<AddProductUseCaseOutput> {
    const { name, price, content } = input

    const result = await this.productRepository.create({
      name,
      price,
      content,
    })

    return { result }
  }
}
