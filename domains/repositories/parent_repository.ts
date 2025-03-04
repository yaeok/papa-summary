import { Parent } from '@/domains/entities/parent'
import { ParentDB } from '@/infrastructure/data/parent'

export interface ParentRepository {
  create(args: { parent: Parent }): Promise<void>
  findByUserId(args: { userId: string }): Promise<ParentDB | null>
}
