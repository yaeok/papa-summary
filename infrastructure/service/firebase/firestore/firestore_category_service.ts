import { Category } from '@/domains/entities/category'
import { CategoryRepository } from '@/domains/repositories/category_repository'
import { CategoryDB } from '@/infrastructure/data/category'
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

export class FirestoreCategoryService implements CategoryRepository {
  private path = 'categories'
  async create(args: { category: Category }): Promise<string> {
    try {
      const { category } = args
      const ref = collection(db, this.path)

      const document = this.convertEntityToDocumentData(category)

      const docRef = await addDoc(ref, document)

      await updateDoc(docRef, { id: docRef.id })

      return docRef.id
    } catch {
      throw new SystemErrorException('カテゴリーの作成に失敗しました')
    }
  }

  async findByUserId(args: { userId: string }): Promise<CategoryDB[]> {
    const { userId } = args
    const ref = collection(db, this.path)

    const q = query(ref, where('createdBy', '==', userId))

    const snapshot = await getDocs(q)

    const response = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData
      return this.convertDocumentDataToData(data)
    })

    return response
  }

  async findById(args: { id: string }): Promise<CategoryDB[]> {
    const { id } = args
    const ref = collection(db, this.path)

    const q = query(ref, where('id', '==', id))

    const snapshot = await getDocs(q)

    const response = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData
      return this.convertDocumentDataToData(data)
    })

    return response
  }

  private convertEntityToDocumentData(category: Category): DocumentData {
    return {
      id: category.getId(),
      name: category.getName(),
      babyId: category.getBabyId(),
      createdBy: category.getCreatedBy(),
      createdAt: category.getCreatedAt(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): CategoryDB {
    const data = new CategoryDB()
    data.setId(documentData.id)
    data.setName(documentData.name)
    data.setBabyId(documentData.babyId)
    data.setCreatedBy(documentData.createdBy)
    data.setCreatedAt(documentData.createdAt.toDate())

    return data
  }
}
