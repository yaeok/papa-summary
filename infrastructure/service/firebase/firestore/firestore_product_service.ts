import { Product } from '@/domains/entities/product'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { ProductDB } from '@/infrastructure/data/product'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreProductService implements ProductRepository {
  private path = 'products'

  async findAll(args: { createdBy: string }): Promise<ProductDB[]> {
    try {
      const { createdBy } = args
      const ref = collection(db, this.path)

      const q = query(ref, where('createdBy', '==', createdBy))

      const snapshot = await getDocs(q)

      const response = snapshot.docs.map((doc) => {
        const data = doc.data()
        return this.convertDocumentDataToData(data)
      })

      return response
    } catch {
      throw new SystemErrorException('買うもの取得に失敗しました')
    }
  }

  async create(args: { product: Product }): Promise<ProductDB> {
    try {
      const { product } = args

      const ref = collection(db, this.path)

      const document = this.convertEntityToDocumentData(product)

      const docRef = await addDoc(ref, document)

      await updateDoc(docRef, { id: docRef.id })

      const response = this.convertDocumentDataToData(document)
      response.setId(docRef.id)

      return response
    } catch {
      throw new SystemErrorException('買うもの登録に失敗しました')
    }
  }

  private convertEntityToDocumentData(product: Product): DocumentData {
    return {
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      content: product.getContent(),
      babyId: product.getBabyId(),
      createdBy: product.getCreatedBy(),
      createdAt: product.getCreatedAt(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): ProductDB {
    const data = new ProductDB()
    data.setId(documentData.id)
    data.setName(documentData.name)
    data.setPrice(documentData.price)
    data.setContent(documentData.content)
    data.setBabyId(documentData.babyId)
    data.setCreatedBy(documentData.createdBy)
    data.setCreatedAt(documentData.createdAt)
    return data
  }
}
