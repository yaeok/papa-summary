import { UserOutput } from '@/infrastructure/data/UserOutput'
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreUserService {
  private path = 'users'
  async findById(args: { id: string }): Promise<UserOutput> {
    const { id } = args
    const ref = collection(db, this.path)

    const q = query(ref, where('id', '==', id))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('No matching documents.')
    }

    const response = querySnapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData
      const user = new UserOutput({
        id: data.id,
        email: data.email,
        name: data.name,
        parentType: data.parentType,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
      })

      return user
    })[0]

    return response
  }

  async create(args: {
    id: string
    name: string
    email: string
    parentType: string
  }): Promise<void> {
    const { id, name, email, parentType } = args

    const ref = doc(db, this.path, id)

    const document = {
      id: id,
      name: name,
      email: email,
      parentType: parentType,
      createdAt: new Date(),
      updatedAt: null,
    }

    await setDoc(ref, document)
  }
}
