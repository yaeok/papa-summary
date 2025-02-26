import { Category } from '@/domains/entities/category'
import { Product } from '@/domains/entities/product'
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { ProductCategoryRepository } from '@/domains/repositories/product_category_repository'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { ProductCategoryDB } from '@/infrastructure/data/product_category'
import { AuthService } from '@/infrastructure/service/firebase/auth/auth_service'
import { FirestoreCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_category_service'
import { FirestoreProductCategoryService } from '@/infrastructure/service/firebase/firestore/firestore_product_category_service'
import { FirestoreProductService } from '@/infrastructure/service/firebase/firestore/firestore_product_service'

import { UseCase, UseCaseInput, UseCaseOutput } from '../use_case'

interface ProductListPageInitialDisplayUseCaseInput extends UseCaseInput {}

interface ProductListPageInitialDisplayUseCaseOutput extends UseCaseOutput {
  response: Product[]
}

export class ProductListPageInitialDisplayUseCase
  implements
    UseCase<
      ProductListPageInitialDisplayUseCaseInput,
      Promise<ProductListPageInitialDisplayUseCaseOutput>
    >
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

  async execute(): Promise<ProductListPageInitialDisplayUseCaseOutput> {
    const user = await this.authRepository.getCurrentUser()

    const createdBy = user.uid

    // 商品情報の取得
    const products = await this.productRepository.findAll({ createdBy })

    // 商品カテゴリ情報の取得
    const productCategories: ProductCategoryDB[] = await Promise.all(
      products.map(async (product) => {
        const productCategories =
          await this.productCategoryRepository.findByProductId({
            productId: product.getId(),
          })
        return productCategories
      })
    ).then((results) => results.flat())

    // カテゴリIdのシングル化
    const setCategoryId: Set<string> = new Set(
      productCategories.map((productCategory) =>
        productCategory.getCategoryId()
      )
    )

    // カテゴリ情報の取得
    const categories: Category[] = await Promise.all(
      Array.from(setCategoryId).map(async (categoryId) => {
        const response = await this.categoryRepository.findById({
          id: categoryId,
        })

        const category = new Category()
        category.setId(response.getId())
        category.setName(response.getName())
        category.setCreatedBy(response.getCreatedBy())
        category.setCreatedAt(response.getCreatedAt())

        return category
      })
    )

    // 商品情報にカテゴリ情報を付与
    const response = products.map((product) => {
      const p = new Product()
      p.setId(product.getId())
      p.setName(product.getName())
      p.setPrice(product.getPrice())
      p.setContent(product.getContent())
      p.setBabyId(product.getBabyId())
      p.setCreatedBy(product.getCreatedBy())
      p.setCreatedAt(product.getCreatedAt())

      // 商品カテゴリ情報から商品とカテゴリを紐付け
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
