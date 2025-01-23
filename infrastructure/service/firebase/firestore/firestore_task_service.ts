import { TaskOutput } from '@/infrastructure/data/TaskOutput'
import { TaskStatus } from '@/types/TaskStatus'
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

  async findAll(args: { ownerId: string }): Promise<TaskOutput[]> {
    const { ownerId } = args
    const ref = collection(db, this.path)

    const q = query(ref, where('ownerId', '==', ownerId))

    const snapshot = await getDocs(q)

    const response = snapshot.docs.map((doc) => {
      const data = doc.data()
      return new TaskOutput({
        id: doc.id,
        title: data.name,
        content: data.content,
        startDate: data.startDate.toDate(),
        endDate: data.endDate?.toDate() ?? null,
        status: data.status,
        ownerId: data.ownerId,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt?.toDate() ?? null,
      })
    })

    return response
  }

  async create(args: {
    name: string
    content: string
    startDate: Date
    endDate: Date | null
    ownerId: string
  }): Promise<TaskOutput> {
    const { name, content, startDate, endDate, ownerId } = args

    const ref = collection(db, this.path)

    const document = {
      name: name,
      content: content,
      startDate: startDate,
      endDate: endDate,
      status: TaskStatus.NOTSTARTED,
      ownerId: ownerId,
      createdAt: new Date(),
      updatedAt: null,
    }

    const docRef = await addDoc(ref, document)

    await updateDoc(docRef, { id: docRef.id })

    const response = new TaskOutput({
      id: docRef.id,
      title: name,
      content: content,
      startDate: startDate,
      endDate: endDate,
      status: TaskStatus.NOTSTARTED,
      ownerId: ownerId,
      createdAt: new Date(),
      updatedAt: null,
    })

    return response
  }
}
