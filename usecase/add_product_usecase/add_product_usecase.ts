import { Product } from '@/domains/entities/product'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreProductService } from '@/infrastructure/service/firebase/firestore/firestore_product_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface AddProductUseCaseInput extends UseCaseInput {
  name: string
  price: number
  content: string
  babyId: string
}

interface AddProductUseCaseOutput extends UseCaseOutput {
  response: Product
}

export class AddProductUseCase
  implements UseCase<AddProductUseCaseInput, Promise<AddProductUseCaseOutput>>
{
  private productRepository: ProductRepository
  private authRepository: AuthRepository

  constructor() {
    this.productRepository = new FirestoreProductService()
    this.authRepository = new AuthService()
  }

  async execute(
    input: AddProductUseCaseInput
  ): Promise<AddProductUseCaseOutput> {
    const { name, price, content, babyId } = input

    const user = await this.authRepository.getCurrentUser()

    const product = new Product()
    product.setName(name)
    product.setPrice(price)
    product.setContent(content)
    product.setBabyId(babyId)
    product.setCreatedBy(user.uid)

    const result = await this.productRepository.create({
      product,
    })

    const response = new Product()
    response.setId(result.getId())
    response.setName(result.getName())
    response.setPrice(result.getPrice())
    response.setContent(result.getContent())
    response.setBabyId(result.getBabyId())
    response.setCreatedBy(result.getCreatedBy())
    response.setCreatedAt(result.getCreatedAt())

    return { response }
  }
}
