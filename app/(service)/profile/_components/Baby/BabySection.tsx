'use client'

import { useEffect, useState } from 'react'

import { Baby } from '@/domains/entities/baby'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GetBabyByIdUseCase } from '@/usecase/get_baby_by_id_usecase/get_baby_by_id_usecase'

import UpdateBabyButton from './update_baby/UpdateBabyButton'

const BabySection = () => {
  const [babyInfo, setBabyInfo] = useState<Baby | null>(null)
  const currentUser = useAuthContext().currentUser
  useEffect(() => {
    const fetch = async () => {
      if (!currentUser) return

      const id = currentUser.getBabyId()
      const usecase = new GetBabyByIdUseCase()
      const { response } = await usecase.execute({ id })

      setBabyInfo(response)
    }
    fetch()
  }, [])
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>赤ちゃん情報</h1>

      <div className='w-full'>
        <div className='flex flex-row justify-between'>
          <p>呼び名</p>
          <p>{babyInfo !== null ? babyInfo.getName() : '未設定'}</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>予定日</p>
          <p>
            {babyInfo !== null && babyInfo.getBirthDate() !== null
              ? new Date(babyInfo.getBirthDate()!).toLocaleDateString()
              : '未設定'}
          </p>
        </div>
      </div>
      <UpdateBabyButton babyInfo={babyInfo!} setBabyInfo={setBabyInfo} />
    </div>
  )
}

export default BabySection
