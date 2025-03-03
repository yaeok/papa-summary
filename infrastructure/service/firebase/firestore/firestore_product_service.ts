import { Product } from '@/domains/entities/product'
import { ProductRepository } from '@/domains/repositories/product_repository'
import { ProductDB } from '@/infrastructure/data/product'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
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

      const response = new ProductDB()
      response.setId(docRef.id)
      response.setName(product.getName())
      response.setPrice(product.getPrice())
      response.setContent(product.getContent())
      response.setBabyId(product.getBabyId())
      response.setPurchasedAt(null)
      response.setCreatedBy(product.getCreatedBy())
      response.setCreatedAt(product.getCreatedAt())

      return response
    } catch {
      throw new SystemErrorException('買うもの登録に失敗しました')
    }
  }

  async updatePurchasedAt(args: { id: string }): Promise<void> {
    try {
      const { id } = args
      const ref = doc(db, this.path, id)

      const document = await getDoc(ref)

      if (!document.exists()) {
        throw new SystemErrorException('買うものが見つかりません')
      }

      await setDoc(ref, { purchasedAt: new Date() })
    } catch {
      throw new SystemErrorException('購入日時の更新に失敗しました')
    }
  }

  private convertEntityToDocumentData(product: Product): DocumentData {
    return {
      id: product.getId(),
      name: product.getName(),
      price: Number(product.getPrice()),
      content: product.getContent(),
      babyId: product.getBabyId(),
      purchasedAt: product.getPurchasedAt(),
      createdBy: product.getCreatedBy(),
      createdAt: product.getCreatedAt(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): ProductDB {
    const purchasedAt =
      documentData.purchasedAt !== null &&
      documentData.purchasedAt !== undefined
        ? documentData.purchasedAt.toDate()
        : null

    const data = new ProductDB()
    data.setId(documentData.id)
    data.setName(documentData.name)
    data.setPrice(documentData.price)
    data.setContent(documentData.content)
    data.setBabyId(documentData.babyId)
    data.setPurchasedAt(purchasedAt)
    data.setCreatedBy(documentData.createdBy)
    data.setCreatedAt(documentData.createdAt.toDate())
    return data
  }
}
