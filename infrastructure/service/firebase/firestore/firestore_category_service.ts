import { Category } from '@/domains/Category'
import { CategoryDTO } from '@/infrastructure/data/CategoryDTO'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreCategoryService {
  private path = 'categories'
  async create(args: { name: string; userId: string }): Promise<string> {
    const { name, userId } = args

    const ref = collection(db, this.path)

    const document = CategoryDTO.fromCategory(
      new Category({ id: '', name, createdAt: new Date() }),
      userId
    ).toDocumentData()

    const docRef = await addDoc(ref, document)

    await updateDoc(docRef, { id: docRef.id })

    return docRef.id
  }

  async findByUserId(args: { userId: string }): Promise<CategoryDTO[]> {
    const { userId } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('ownerId', '==', userId))

    const snapshot = await getDocs(q)

    const response = snapshot.docs.map((doc) => {
      return CategoryDTO.fromDocumentData(doc.data(), doc.id)
    })

    return response
  }
}
