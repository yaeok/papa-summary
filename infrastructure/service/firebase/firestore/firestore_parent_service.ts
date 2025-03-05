import { Parent } from '@/domains/entities/parent'
import { ParentRepository } from '@/domains/repositories/parent_repository'
import { ParentDB } from '@/infrastructure/data/parent'
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

export class FirestoreParentService implements ParentRepository {
  private path = 'parents'
  async create(args: { parent: Parent }): Promise<void> {
    try {
      const { parent } = args
      const ref = collection(db, this.path)

      const document = this.convertEntityToDocumentData(parent)

      await addDoc(ref, document)
    } catch {
      throw new SystemErrorException('親情報の作成に失敗しました')
    }
  }

  async findByUserId(args: { userId: string }): Promise<ParentDB | null> {
    try {
      const { userId } = args
      const ref = collection(db, this.path)

      // クエリ作成
      const q = query(ref, where('userId', '==', userId))

      // データ取得
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        return null
      }

      const document = snapshot.docs[0].data()

      return this.convertDocumentDataToData(document)
    } catch {
      throw new SystemErrorException('親情報の取得に失敗しました')
    }
  }

  private convertEntityToDocumentData(parent: Parent): DocumentData {
    return {
      userId: parent.getUserId(),
      babyId: parent.getBabyId(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): ParentDB {
    const data = new ParentDB()
    data.setUserId(documentData.userId)
    data.setBabyId(documentData.babyId)

    return data
  }
}
