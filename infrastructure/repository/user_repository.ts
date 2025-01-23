import { User } from '@/domains/User'

import { UserOutput } from '../data/UserOutput'
import { FirestoreUserService } from '../service/firebase/firestore/firestore_user_service'

export class UserRepository {
  private service: FirestoreUserService

  constructor() {
    this.service = new FirestoreUserService()
  }
  async findById(args: { id: string }): Promise<User> {
    const response: UserOutput = await this.service.findById(args)

    const user = new User({
      id: response.id,
      email: response.email,
      name: response.name,
      parentType: response.parentType,
      babyId: '',
      createdAt: response.createdAt,
    })

    return user
  }

  async create(args: {
    id: string
    email: string
    name: string
    parentType: string
  }): Promise<void> {
    await this.service.create(args)
  }
}
