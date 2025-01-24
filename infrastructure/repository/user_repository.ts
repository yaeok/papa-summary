import { User } from '@/domains/User'

import { UserDTO } from '../data/UserDTO'
import { FirestoreUserService } from '../service/firebase/firestore/firestore_user_service'

export class UserRepository {
  private service: FirestoreUserService

  constructor() {
    this.service = new FirestoreUserService()
  }
  async findById(args: { id: string }): Promise<User> {
    const response: UserDTO = await this.service.findById(args)

    const user = User.fromUserDTO(response)

    return user
  }

  async create(args: {
    id: string
    email: string
    name: string
    parentType: number
  }): Promise<void> {
    await this.service.create(args)
  }

  async updateFromNameParentType(args: {
    id: string
    name: string
    parentType: number
  }): Promise<void> {
    await this.service.updateFromNameParentType(args)
  }
}
