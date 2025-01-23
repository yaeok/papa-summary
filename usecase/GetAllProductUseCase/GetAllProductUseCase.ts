import { Product } from '@/domains/Product'
import { UseCase, UseCaseInput, UseCaseOutput } from '../UseCase'
import { ProductRepository } from '@/infrastructure/repository/product_repository'
import { AuthRepository } from '@/infrastructure/repository/auth_repository'

interface GetAllProductUseCaseInput extends UseCaseInput {}

interface GetAllProductUseCaseOutput extends UseCaseOutput {
  products: Product[]
}

export class GetAllProductUseCase
  implements
    UseCase<GetAllProductUseCaseInput, Promise<GetAllProductUseCaseOutput>>
{
  private productRepository: ProductRepository
  private authRepository: AuthRepository

  constructor() {
    this.productRepository = new ProductRepository()
    this.authRepository = new AuthRepository()
  }

  async execute(): Promise<GetAllProductUseCaseOutput> {
    const user = await this.authRepository.getCurrentUser()

    const ownerId = user.id

    const products = await this.productRepository.findAll({ ownerId })

    return { products }
  }
}
