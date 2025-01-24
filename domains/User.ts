import { UserDTO } from '@/infrastructure/data/UserDTO'

export class User {
  id: string
  name: string
  email: string
  parentType: number
  babyId: string
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    email: string
    parentType: number
    babyId: string
    createdAt: Date
  }) {
    const { id, name, email, parentType, babyId, createdAt } = args
    this.id = id
    this.name = name
    this.email = email
    this.parentType = parentType
    this.babyId = babyId
    this.createdAt = createdAt
  }

  static fromUserDTO(userDTO: UserDTO): User {
    return new User({
      id: userDTO.id,
      name: userDTO.name,
      email: userDTO.email,
      parentType: userDTO.parentType,
      babyId: '',
      createdAt: userDTO.createdAt,
    })
  }
}
