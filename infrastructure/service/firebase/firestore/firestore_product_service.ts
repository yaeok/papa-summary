import { ProductOutput } from '@/infrastructure/data/ProductOutput'
import { addDoc, collection, setDoc, updateDoc } from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreProductService {
  private path = 'products'

  async create(args: {
    name: string
    price: number
    content: string
  }): Promise<ProductOutput> {
    const { name, price, content } = args

    const ref = collection(db, this.path)

    const document = {
      name: name,
      price: price,
      content: content,
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
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    })

    return response
  }
}
