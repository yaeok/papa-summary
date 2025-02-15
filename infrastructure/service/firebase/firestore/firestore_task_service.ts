import { Task } from '@/domains/entities/task'
import { TaskRepository } from '@/domains/repositories/task_repository'
import { TaskDB } from '@/infrastructure/data/task'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../config/firebaseConfig'

export class FirestoreTaskService implements TaskRepository {
  private path = 'tasks'

  async findAll(args: { babyId: string }): Promise<TaskDB[]> {
    try {
      const { babyId } = args
      const ref = collection(db, this.path)

      const q = query(ref, where('babyId', '==', babyId))

      const snapshot = await getDocs(q)

      const response = snapshot.docs.map((doc) => {
        const data = doc.data()
        return this.convertDocumentDataToData(data)
      })

      return response
    } catch {
      throw new SystemErrorException('タスク取得に失敗しました')
    }
  }

  async findById(args: { id: string }): Promise<TaskDB> {
    try {
      const { id } = args
      const ref = collection(db, this.path)

      const q = query(ref, where('id', '==', id))

      const snapshot = await getDocs(q)

      const response = snapshot.docs.map((doc) => {
        const data = doc.data()
        return this.convertDocumentDataToData(data)
      })

      return response[0]
    } catch {
      throw new SystemErrorException('タスク取得に失敗しました')
    }
  }

  async create(args: { task: Task }): Promise<TaskDB> {
    try {
      const { task } = args
      const ref = collection(db, this.path)

      const document = this.convertEntityToDocumentData(task)

      const docRef = await addDoc(ref, document)

      await updateDoc(docRef, { id: docRef.id })

      const response = new TaskDB()
      response.setId(docRef.id)
      response.setTitle(task.getTitle())
      response.setContent(task.getContent())
      response.setStartDate(task.getStartDate())
      response.setEndDate(task.getEndDate())
      response.setBabyId(task.getBabyId())
      response.setTiming(task.getTiming())
      response.setCompletedAt(task.getCompletedAt())
      response.setCreatedBy(task.getCreatedBy())
      response.setCreatedAt(task.getCreatedAt())

      return response
    } catch {
      throw new SystemErrorException('タスク作成に失敗しました')
    }
  }

  private convertEntityToDocumentData(task: Task): DocumentData {
    return {
      id: task.getId(),
      title: task.getTitle(),
      content: task.getContent(),
      startDate: task.getStartDate(),
      endDate: task.getEndDate(),
      babyId: task.getBabyId(),
      timing: task.getTiming(),
      completedAt: task.getCompletedAt(),
      createdBy: task.getCreatedBy(),
      createdAt: task.getCreatedAt(),
    }
  }

  private convertDocumentDataToData(documentData: DocumentData): TaskDB {
    const endDate =
      documentData.endDate !== null ? documentData.endDate.toDate() : null

    const completedAt =
      documentData.completedAt !== null
        ? documentData.completedAt.toDate()
        : null

    const data = new TaskDB()
    data.setId(documentData.id)
    data.setTitle(documentData.title)
    data.setContent(documentData.content)
    data.setStartDate(documentData.startDate.toDate())
    data.setEndDate(endDate)
    data.setBabyId(documentData.babyId)
    data.setTiming(documentData.timing)
    data.setCompletedAt(completedAt)
    data.setCreatedBy(documentData.createdBy)
    data.setCreatedAt(documentData.createdAt.toDate())

    return data
  }
}
