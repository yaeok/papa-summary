import { Parent } from '@/domains/Parent'

import { FirestoreParentService } from '../service/firebase/firestore/firestore_parent_service'

export class ParentRepository {
  private service: FirestoreParentService

  constructor() {
    this.service = new FirestoreParentService()
  }

  async create(args: { userId: string; babyId: string }): Promise<Parent> {
    const result = await this.service.create(args)

    const response = Parent.fromParentDTO(result)

    return response
  }

  async findByUserId(args: { userId: string }): Promise<Parent> {
    const result = await this.service.findByUserId(args)

    const response = Parent.fromParentDTO(result)

    return response
  }
}
