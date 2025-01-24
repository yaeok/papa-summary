import { Baby } from '@/domains/Baby'
import { BabyDTO } from '@/infrastructure/data/BabyDTO'
import { addDoc, collection, updateDoc } from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreBabyService {
  private path = 'babies'

  async create(args: { baby: Baby }): Promise<BabyDTO> {
    const { baby } = args

    const ref = collection(db, this.path)

    const document = BabyDTO.fromBaby(baby).toDocumentData()

    const docRef = await addDoc(ref, document)

    await updateDoc(docRef, { id: docRef.id })

    return BabyDTO.fromDocumentData(document, docRef.id)
  }
}
