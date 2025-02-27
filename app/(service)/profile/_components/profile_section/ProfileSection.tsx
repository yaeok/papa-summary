'use client'

import Avatar from 'boring-avatars'
import { useEffect } from 'react'

import { Label } from '@/constants/Label'
import { Status } from '@/constants/Status'
import { useAuthContext } from '@/providers/CurrentUserProvider'

import UpdateProfileButton from './update_profile/UpdateProfileButton'

export default function ProfileSection() {
  const currentUser = useAuthContext().currentUser

  useEffect(() => {
    if (!currentUser) return
  }, [currentUser])

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <div className='w-full py-8 flex flex-col items-center justify-center gap-4'>
        <div className='relative w-36 h-36'>
          <Avatar
            size='150px'
            name={currentUser?.getEmail()}
            variant='bauhaus'
          />
          <div className='absolute bottom-0 -right-4'>
            {currentUser?.getParentType() === Status.getParentTypeFather() ? (
              <span className='px-4 py-1 bg-blue-400 rounded-full'>
                {Label.getParentTypeFather()}
              </span>
            ) : (
              <span className='px-4 py-1 bg-red-400 rounded-full'>
                {Label.getParentTypeMother()}
              </span>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-sm'>ユーザ名</p>
          <div className='flex flex-row gap-2'>
            <p>{currentUser?.getName()}</p>
          </div>
          <p className='text-sm'>メールアドレス</p>
          <p>{currentUser?.getEmail()}</p>
        </div>
      </div>
      <UpdateProfileButton />
    </div>
  )
}
