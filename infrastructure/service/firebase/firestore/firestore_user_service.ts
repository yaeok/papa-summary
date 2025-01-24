import { UserDTO } from '@/infrastructure/data/UserDTO'
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

export class FirestoreUserService {
  private path = 'users'
  async findById(args: { id: string }): Promise<UserDTO> {
    const { id } = args
    const ref = collection(db, this.path)

    const q = query(ref, where('id', '==', id))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('No matching documents.')
    }

    const response = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      const user = UserDTO.fromDocumentData(data, doc.id)

      return user
    })[0]

    return response
  }

  async create(args: {
    id: string
    name: string
    email: string
    parentType: number
  }): Promise<void> {
    const { id, name, email, parentType } = args

    const ref = doc(db, this.path, id)

    const document = UserDTO.fromUser({
      id: id,
      name: name,
      email: email,
      parentType: parentType,
      babyId: '',
      createdAt: new Date(),
    }).toDocumentData()

    await setDoc(ref, document)
  }

  async updateFromNameParentType(args: {
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

    await setDoc(ref, document, { merge: true })
  }
}
