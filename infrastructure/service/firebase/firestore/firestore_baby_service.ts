import { Baby } from '@/domains/entities/baby'
import { BabyRepository } from '@/domains/repositories/baby_repository'
import { BabyDB } from '@/infrastructure/data/baby'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreBabyService implements BabyRepository {
  private path = 'babies'

  async create(args: { baby: Baby }): Promise<BabyDB> {
    const { baby } = args
    const ref = collection(db, this.path)

    // Entity→DocumentDataへ変換
    const document: DocumentData = this.convertEntityToDocumentData(baby)

    // DocumentDataの追加
    const docRef = await addDoc(ref, document)

    // idの追加
    await updateDoc(docRef, { id: docRef.id })

    // 戻り値
    const response = new BabyDB()
    response.setId(docRef.id)
    response.setName(baby.getName())
    response.setBirthDate(baby.getBirthDate())
    response.setCreatedAt(new Date())
    response.setUpdatedAt(new Date())

    return response
  }

  /**
   * findById Idをもとにデータを取得
   * @param args.id id
   * @returns BabyDTO | null
   */
  async findById(args: { id: string }): Promise<BabyDB> {
    try {
      const { id } = args
      const ref = collection(db, this.path)

      // クエリを作成
      const q = query(ref, where('id', '==', id))

      // クエリの実行
      const snapshot = await getDocs(q)

      // データがない場合はnullを返す
      if (snapshot.empty) {
        throw new SystemErrorException('データが存在しません')
      }

      // データを取得
      const document = snapshot.docs[0].data()

      const response = this.convertDocumentDataToData(document)

      return response
    } catch {
      throw new SystemErrorException('データの取得に失敗しました')
    }
  }

  async updateById(args: {
    id: string
    name: string
    birthDate: Date
  }): Promise<void> {
    const { id, name, birthDate } = args
    const ref = doc(db, this.path, id)

    // BabyDTOに変換してdocument dataに変換
    const document: DocumentData = {
      name: name,
      birthDate: birthDate,
      updatedAt: new Date(),
    }

    // documentの更新
    await setDoc(ref, document, { merge: true })
  }

  private convertEntityToDocumentData(baby: Baby): DocumentData {
    return {
      id: baby.getId(),
      name: baby.getName(),
      birthDate: baby.getBirthDate(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): BabyDB {
    const data = new BabyDB()

    const birthDate =
      documentData.birthDate !== null ? documentData.birthDate.toDate() : null

    data.setId(documentData.id)
    data.setName(documentData.name)
    data.setBirthDate(birthDate)
    data.setCreatedAt(documentData.createdAt.toDate())
    data.setUpdatedAt(documentData.updatedAt.toDate())

    return data
  }
}
