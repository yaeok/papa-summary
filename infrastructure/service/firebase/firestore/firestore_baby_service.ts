import { Baby } from '@/domains/Baby'
import { BabyDTO } from '@/infrastructure/data/BabyDTO'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreBabyService {
  private path = 'babies'

  async create(args: { baby: Baby }): Promise<string> {
    const { baby } = args

    const ref = collection(db, this.path)

    const document = BabyDTO.fromBaby({ baby }).toDocumentData()

    const docRef = await addDoc(ref, document)

    await updateDoc(docRef, { id: docRef.id })

    return docRef.id
  }

  async findById(args: { id: string }): Promise<BabyDTO | null> {
    const { id } = args

    const ref = collection(db, this.path)

    const q = query(ref, where('id', '==', id))

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const document = snapshot.docs[0].data()

    return BabyDTO.fromDocumentData(document, id)
  }

  async updateById(args: { baby: Baby }): Promise<void> {
    const { baby } = args

    const ref = doc(db, this.path, baby.id)

    const document = BabyDTO.fromBaby({
      baby,
      updatedAt: new Date(),
    }).toDocumentData()

    await setDoc(ref, document, { merge: true })
  }
}
