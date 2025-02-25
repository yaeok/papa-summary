import { Product } from '@/domains/entities/product'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreProductService } from '@/infrastructure/service/firebase/firestore/firestore_product_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'
import { ProductCategoryRepository } from '@/domains/repositories/product_category_repository'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { FirestoreCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_category_service'
import { FirestoreProductCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_product_category_service'
import { ProductCategoryDB } from '@/infrastructure/data/product_category'
import { Category } from '@/domains/entities/category'

interface GetAllProductUseCaseInput extends UseCaseInput {}

interface GetAllProductUseCaseOutput extends UseCaseOutput {
  response: Product[]
}

export class GetAllProductUseCase
  implements
    UseCase<GetAllProductUseCaseInput, Promise<GetAllProductUseCaseOutput>>
{
  private productRepository: ProductRepository
  private categoryRepository: CategoryRepository
  private productCategoryRepository: ProductCategoryRepository
  private authRepository: AuthRepository

  constructor() {
    this.productRepository = new FirestoreProductService()
    this.categoryRepository = new FirestoreCategoryService()
    this.productCategoryRepository = new FirestoreProductCategoryService()
    this.authRepository = new AuthService()
  }

  async execute(): Promise<GetAllProductUseCaseOutput> {
    const user = await this.authRepository.getCurrentUser()

    const createdBy = user.uid

    const products = await this.productRepository.findAll({ createdBy })

    const productCategories: ProductCategoryDB[] = await Promise.all(
      products.map(async (product) => {
        const productCategories =
          await this.productCategoryRepository.findByProductId({
            productId: product.getId(),
          })
        return productCategories
      })
    ).then((results) => results.flat())

    const setCategoryId: Set<string> = new Set(
      productCategories.map((productCategory) =>
        productCategory.getCategoryId()
      )
    )

    const categories: Category[] = await Promise.all(
      Array.from(setCategoryId).map(async (categoryId, index) => {
        const response = await this.categoryRepository.findById({
          id: categoryId,
        })

        const category = new Category()
        category.setId(response[index].getId())
        category.setName(response[index].getName())
        category.setCreatedBy(response[index].getCreatedBy())
        category.setCreatedAt(response[index].getCreatedAt())

        return category
      })
    )

    const response = products.map((product) => {
      const p = new Product()
      p.setId(product.getId())
      p.setName(product.getName())
      p.setPrice(product.getPrice())
      p.setContent(product.getContent())
      p.setBabyId(product.getBabyId())
      p.setCreatedBy(product.getCreatedBy())
      p.setCreatedAt(product.getCreatedAt())

      productCategories.find((productCategory) => {
        if (productCategory.getProductId() === product.getId()) {
          p.setCategories(
            categories.filter((category) => {
              if (category.getId() === productCategory.getCategoryId()) {
                return category
              }
            })
          )
        }
      })
      return p
    })

    return { response }
  }
}
