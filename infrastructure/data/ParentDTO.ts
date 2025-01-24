import { DocumentData } from '@firebase/firestore'

export class ParentDTO {
  userId: string
  babyId: string

  constructor(args: { userId: string; babyId: string }) {
    const { userId, babyId } = args

    this.userId = userId
    this.babyId = babyId
  }

  static fromDocumentData(data: DocumentData): ParentDTO {
    return new ParentDTO({
      userId: data.userId,
      babyId: data.babyId,
    })
  }

  static fromArgs(args: { userId: string; babyId: string }): ParentDTO {
    return new ParentDTO({
      userId: args.userId,
      babyId: args.babyId,
    })
  }

  toDocumentData(): DocumentData {
    return {
      userId: this.userId,
      babyId: this.babyId,
    }
  }
}
