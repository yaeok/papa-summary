import { BabyDTO } from '@/infrastructure/data/BabyDTO'

export class Baby {
  id: string
  name: string
  birthDate: Date | null

  constructor(args: { id: string; name: string; birthDate: Date | null }) {
    const { id, name, birthDate } = args
    this.id = id
    this.name = name
    this.birthDate = birthDate
  }

  static fromBabyDTO(babyDTO: BabyDTO): Baby {
    return new Baby({
      id: babyDTO.id,
      name: babyDTO.name,
      birthDate: babyDTO.birthDate ? new Date(babyDTO.birthDate) : null,
    })
  }
}
