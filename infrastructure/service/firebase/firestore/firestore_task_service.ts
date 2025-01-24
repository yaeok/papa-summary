import { TaskDTO } from '@/infrastructure/data/TaskDTO'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreTaskService {
  private path = 'tasks'

  async findAll(args: { babyId: string }): Promise<TaskDTO[]> {
    const { babyId } = args
    const ref = collection(db, this.path)

    const q = query(ref, where('babyId', '==', babyId))

    const snapshot = await getDocs(q)

    const response = snapshot.docs.map((doc) => {
      const data = doc.data()
      return TaskDTO.fromDocumentData(data, doc.id)
    })

    return response
  }

  async create(args: {
    name: string
    content: string
    startDate: Date
    endDate: Date | null
    babyId: string
  }): Promise<TaskDTO> {
    const { name, content, startDate, endDate, babyId } = args

    const ref = collection(db, this.path)

    const document = TaskDTO.fromTask({
      id: '',
      title: name,
      content: content,
      startDate: startDate,
      endDate: endDate,
      timing: 0,
      babyId: babyId,
      completedAt: null,
      createdAt: new Date(),
    }).toDocumentData()

    const docRef = await addDoc(ref, document)

    await updateDoc(docRef, { id: docRef.id })

    const response = TaskDTO.fromDocumentData(document, docRef.id)

    return response
  }
}
