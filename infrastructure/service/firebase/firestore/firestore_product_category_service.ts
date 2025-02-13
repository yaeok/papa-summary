import { ProductCategoryRepository } from '@/domains/repositories/product_category_repository'
import { ProductCategoryDB } from '@/infrastructure/data/product_category'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreProductCategoryService
  implements ProductCategoryRepository
{
  private path = 'product_categories'
  async create(args: { productCategory: ProductCategoryDB }): Promise<void> {
    try {
      const { productCategory } = args
      const ref = collection(db, this.path)

      const document = this.convertEntityToDocumentData(productCategory)

      await addDoc(ref, document)
    } catch {
      throw new SystemErrorException('買うものカテゴリーの作成に失敗しました')
    }
  }

  async findByProductId(args: {
    productId: string
  }): Promise<ProductCategoryDB[]> {
    try {
      const { productId } = args
      const ref = collection(db, this.path)

      // クエリ作成
      const q = query(ref, where('productId', '==', productId))

      // データ取得
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        return []
      }

      const productCategories: ProductCategoryDB[] = []
      snapshot.forEach((doc) => {
        const document = doc.data()
        productCategories.push(this.convertDocumentDataToData(document))
      })

      return productCategories
    } catch {
      throw new SystemErrorException('買うものカテゴリーの取得に失敗しました')
    }
  }

  private convertEntityToDocumentData(
    productCategory: ProductCategoryDB
  ): DocumentData {
    return {
      productId: productCategory.getProductId(),
      categoryId: productCategory.getCategoryId(),
    }
  }

  private convertDocumentDataToData(document: DocumentData): ProductCategoryDB {
    const data = new ProductCategoryDB()
    data.setProductId(document.productId)
    data.setCategoryId(document.categoryId)

    return data
  }
}
