import { BabyDTO } from '@/infrastructure/data/BabyDTO'

export class Baby {
  id: string
  name: string
  birthDate: Date | null
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    birthDate: Date | null
    createdAt: Date
  }) {
    const { id, name, birthDate, createdAt } = args
    this.id = id
    this.name = name
    this.birthDate = birthDate
    this.createdAt = createdAt
  }

  static fromBabyDTO(babyDTO: BabyDTO): Baby {
    return new Baby({
      id: babyDTO.id,
      name: babyDTO.name,
      birthDate: babyDTO.birthDate,
      createdAt: babyDTO.createdAt,
    })
  }
}
