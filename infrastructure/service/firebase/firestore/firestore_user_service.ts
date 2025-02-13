import { User } from '@/domains/entities/user'
import { UserRepository } from '@/domains/repositories/user_repository'
import { UserDB } from '@/infrastructure/data/user'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import {
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

export class FirestoreUserService implements UserRepository {
  private path = 'users'
  async findById(args: { id: string }): Promise<UserDB> {
    try {
      const { id } = args
      const ref = collection(db, this.path)

      const q = query(ref, where('id', '==', id))

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new SystemErrorException('ユーザーが見つかりませんでした')
      }

      const response = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return this.convertDocumentDataToData(data)
      })

      return response[0]
    } catch {
      throw new SystemErrorException('ユーザー取得に失敗しました')
    }
  }

  async create(args: { user: User }): Promise<UserDB> {
    try {
      const { user } = args
      const ref = doc(db, this.path, user.getId())

      const document = this.convertEntityToDocumentData(user)

      await setDoc(ref, document)

      return this.convertDocumentDataToData(document)
    } catch {
      throw new SystemErrorException('ユーザー登録に失敗しました')
    }
  }

  async updateNameParentType(args: {
    id: string
    name: string
    parentType: number
  }): Promise<void> {
    const { id, name, parentType } = args

    const ref = doc(db, this.path, id)

    const document = {
      name: name,
      parentType: parentType,
    }

    await updateDoc(ref, document)
  }

  private convertEntityToDocumentData(user: User): DocumentData {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      parentType: user.getParentType(),
      babyId: user.getBabyId(),
      createdAt: user.getCreatedAt(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): UserDB {
    const data = new UserDB()
    data.setId(documentData.id)
    data.setName(documentData.name)
    data.setEmail(documentData.email)
    data.setParentType(documentData.parentType)
    data.setBabyId(documentData.babyId)
    data.setCreatedAt(documentData.createdAt.toDate())

    return data
  }
}
