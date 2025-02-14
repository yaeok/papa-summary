import { Product } from '@/domains/entities/product'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreProductService } from '@/infrastructure/service/firebase/firestore/firestore_product_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface GetAllProductUseCaseInput extends UseCaseInput {}

interface GetAllProductUseCaseOutput extends UseCaseOutput {
  response: Product[]
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
      const p = new Product()
      p.setId(product.getId())
      p.setName(product.getName())
      p.setPrice(product.getPrice())
      p.setContent(product.getContent())
      p.setBabyId(product.getBabyId())
      p.setCreatedBy(product.getCreatedBy())
      p.setCreatedAt(product.getCreatedAt())
      return p
    })

    return { response }
  }
}
