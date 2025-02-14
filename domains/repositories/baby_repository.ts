import { Baby } from '@/domains/entities/baby'
import { BabyDB } from '@/infrastructure/data/baby'

export interface BabyRepository {
  create(args: { baby: Baby }): Promise<BabyDB>
  findById(args: { id: string }): Promise<BabyDB>
  updateById(args: { id: string; name: string; birthDate: Date }): Promise<void>
}
