import { Product } from '@/domains/Product'
import { ProductRepository } from '@/infrastructure/repository/product_repository'

import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'

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
  private authRepository: AuthRepository

  constructor() {
    this.productRepository = new ProductRepository()
    this.authRepository = new AuthRepository()
  }

  async execute(
    input: AddProductUseCaseInput
  ): Promise<AddProductUseCaseOutput> {
    const { name, price, content } = input

    const user = await this.authRepository.getCurrentUser()

    const ownerId = user.id

    const result = await this.productRepository.create({
      name,
      price,
      content,
      ownerId,
    })

    return { result }
  }
}
