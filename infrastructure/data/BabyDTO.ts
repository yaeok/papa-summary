import { Baby } from '@/domains/Baby'
import { DocumentData } from '@firebase/firestore'

export class BabyDTO {
  id: string
  name: string
  birthDate: Date | null
  createdAt: Date
  updatedAt?: Date | null

  constructor(args: {
    id: string
    name: string
    birthDate: Date | null
    createdAt: Date
    updatedAt?: Date | null
  }) {
    const { id, name, birthDate, createdAt } = args
    this.id = id
    this.name = name
    this.birthDate = birthDate
    this.createdAt = createdAt
    this.updatedAt = args.updatedAt
  }

  static fromDocumentData(data: DocumentData, id: string): BabyDTO {
    return new BabyDTO({
      id: id,
      name: data.name,
      birthDate: data.birthDate ? data.birthDate.toDate() : null,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
    })
  }

  static fromBaby(args: { baby: Baby; updatedAt?: Date }): BabyDTO {
    const { baby, updatedAt } = args
    return new BabyDTO({
      id: baby.id,
      name: baby.name,
      birthDate: baby.birthDate ? new Date(baby.birthDate) : null,
      createdAt: new Date(),
      updatedAt: updatedAt ?? null,
    })
  }

  toDocumentData(): DocumentData {
    return {
      id: this.id,
      name: this.name,
      birthDate: this.birthDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
