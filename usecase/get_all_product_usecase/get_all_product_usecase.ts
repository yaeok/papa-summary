import { Product } from '@/domains/entities/product'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { FirestoreProductService } from '@/infrastructure/service/firebase/firestore/firestore_product_service'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'

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
    this.productRepository = new FirestoreProductService()
    this.authRepository = new AuthService()
  }

  async execute(): Promise<GetAllProductUseCaseOutput> {
    const user = await this.authRepository.getCurrentUser()

    const createdBy = user.uid

    const products = await this.productRepository.findAll({ createdBy })

    const response = products.map((product) => {
      const 
    })

    return { products }
  }
}
