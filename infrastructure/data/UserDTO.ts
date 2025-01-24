import { User } from '@/domains/User'
import { DocumentData } from '@firebase/firestore'

export class UserDTO {
  id: string
  name: string
  email: string
  parentType: number
  createdAt: Date
  updatedAt: Date | null

  constructor(args: {
    id: string
    name: string
    email: string
    parentType: number
    createdAt: Date
    updatedAt: Date | null
  }) {
    const { id, name, email, parentType, createdAt, updatedAt } = args
    this.id = id
    this.name = name
    this.email = email
    this.parentType = parentType
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromDocumentData(data: DocumentData, id: string): UserDTO {
    return new UserDTO({
      id: id,
      name: data.name,
      email: data.email,
      parentType: data.parentType,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate() ?? null,
    })
  }

  static fromUser(user: User, updatedAt?: Date): UserDTO {
    return new UserDTO({
      id: user.id,
      name: user.name,
      email: user.email,
      parentType: user.parentType,
      createdAt: user.createdAt,
      updatedAt: updatedAt ?? null,
    })
  }

  toDocumentData(): DocumentData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      parentType: this.parentType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
