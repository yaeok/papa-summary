import { ProductOutput } from '@/infrastructure/data/ProductOutput'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreProductService {
  private path = 'products'

  async findAll(args: { ownerId: string }): Promise<ProductOutput[]> {
    const { ownerId } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('ownerId', '==', ownerId))

    const snapshot = await getDocs(q)

    const response = snapshot.docs.map((doc) => {
      const data = doc.data()
      return new ProductOutput({
        id: doc.id,
        name: data.name,
        price: data.price,
        content: data.content,
        ownerId: data.ownerId,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt?.toDate() ?? null,
      })
    })

    return response
  }

  async create(args: {
    name: string
    price: number
    content: string
    ownerId: string
  }): Promise<ProductOutput> {
    const { name, price, content, ownerId } = args

    const ref = collection(db, this.path)

    const document = {
      name: name,
      price: price,
      content: content,
      ownerId: ownerId,
      createdAt: new Date(),
      updatedAt: null,
    }

    const docRef = await addDoc(ref, document)

    await updateDoc(docRef, { id: docRef.id })

    const response = new ProductOutput({
      id: docRef.id,
      name: name,
      price: price,
      content: content,
      ownerId: ownerId,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    })

    return response
  }
}
