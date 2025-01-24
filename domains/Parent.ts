import { ParentDTO } from '@/infrastructure/data/ParentDTO'

export class Parent {
  userId: string
  babyId: string

  constructor(args: { userId: string; babyId: string }) {
    const { userId, babyId } = args

    this.userId = userId
    this.babyId = babyId
  }

  static fromParentDTO(parentDTO: ParentDTO): Parent {
    return new Parent({
      userId: parentDTO.userId,
      babyId: parentDTO.babyId,
    })
  }
}
