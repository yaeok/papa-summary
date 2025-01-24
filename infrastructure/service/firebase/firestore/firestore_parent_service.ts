import { ParentDTO } from '@/infrastructure/data/ParentDTO'
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreParentService {
  private path = 'parents'
  async create(args: { userId: string; babyId: string }): Promise<ParentDTO> {
    const ref = collection(db, this.path)

    const document = ParentDTO.fromArgs(args).toDocumentData()

    await addDoc(ref, document)

    console.log('Document written with ID: ', document)

    return ParentDTO.fromDocumentData(document)
  }

  async findByUserId(args: { userId: string }): Promise<ParentDTO | null> {
    const { userId } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('userId', '==', userId))

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const document = snapshot.docs[0].data()

    return ParentDTO.fromDocumentData(document)
  }
}
