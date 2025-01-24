import { Baby } from '@/domains/Baby'

import { FirestoreBabyService } from '../service/firebase/firestore/firestore_baby_service'

export class BabyRepository {
  private service: FirestoreBabyService

  constructor() {
    this.service = new FirestoreBabyService()
  }

  async create(args: { name: string; birthDate: Date }): Promise<Baby> {
    const baby = new Baby({
      id: '',
      name: args.name,
      birthDate: args.birthDate,
      createdAt: new Date(),
    })

    const result = await this.service.create({ baby })

    const response = Baby.fromBabyDTO(result)

    return response
  }
}
