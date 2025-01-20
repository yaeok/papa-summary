import { User } from '@/domains/User'

import { UserOutput } from '../data/UserOutput'
import { FirestoreUserService } from '../service/firebase/firestore/firestore_user_service'

export class UserRepository {
  async findById(args: { id: string }): Promise<User> {
    const service = new FirestoreUserService()
    const response: UserOutput = await service.findById(args)

    const user = new User({
      id: response.id,
      email: response.email,
      name: response.name,
      parentType: response.parentType,
      createdAt: response.createdAt,
    })

    return user
  }
}
