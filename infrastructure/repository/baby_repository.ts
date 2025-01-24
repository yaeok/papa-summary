import { Baby } from '@/domains/Baby'

import { FirestoreBabyService } from '../service/firebase/firestore/firestore_baby_service'

export class BabyRepository {
  private service: FirestoreBabyService

  constructor() {
    this.service = new FirestoreBabyService()
  }

  async create(args: { name: string; birthDate: Date }): Promise<string> {
    try {
      const baby = new Baby({
        id: '',
        name: args.name,
        birthDate: args.birthDate,
      })

      const response = await this.service.create({ baby })

      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create baby')
    }
  }

  async findById(args: { id: string }): Promise<Baby | null> {
    try {
      const baby = await this.service.findById(args)

      if (baby != null) {
        const response = Baby.fromBabyDTO(baby)

        return response
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to find baby')
    }
  }

  async updateById(args: {
    id: string
    name: string
    birthDate: Date
  }): Promise<void> {
    try {
      const baby = new Baby({
        id: args.id,
        name: args.name,
        birthDate: args.birthDate,
      })
      const response = await this.service.updateById({ baby })

      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update baby')
    }
  }
}
