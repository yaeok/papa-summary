'use client'

import { useEffect, useState } from 'react'

import { Baby } from '@/domains/Baby'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { GetBabyByIdUseCase } from '@/usecase/GetBabyByIdUseCase/GetBabyByIdUseCase'

import UpdateBabyButton from './UpdateBaby/UpdateBabyButton'

const BabySection = () => {
  const [babyInfo, setBabyInfo] = useState<Baby | null>(null)
  const currentUser = useAuthContext().currentUser
  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        const usecase = new GetBabyByIdUseCase()
        const baby = await usecase.execute({ id: currentUser.babyId })
        setBabyInfo(baby.baby)
      }
    }
    fetch()
  }, [])
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>赤ちゃん情報</h1>

      <div className='w-full'>
        <div className='flex flex-row justify-between'>
          <p>呼び名</p>
          <p>{babyInfo?.name}</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>予定日</p>
          <p>
            {babyInfo?.birthDate
              ? new Date(babyInfo?.birthDate).toLocaleDateString()
              : '未設定'}
          </p>
        </div>
      </div>
      <UpdateBabyButton babyInfo={babyInfo!} setBabyInfo={setBabyInfo} />
    </div>
  )
}

export default BabySection
