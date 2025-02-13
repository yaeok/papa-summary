import { User } from '@/domains//entities/user'
import { UserDB } from '@/infrastructure/data/user'

export interface UserRepository {
  findById(args: { id: string }): Promise<UserDB>
  create(args: { user: User }): Promise<UserDB>
  updateNameParentType(args: {
    id: string
    name: string
    parentType: number
  }): Promise<void>
}
