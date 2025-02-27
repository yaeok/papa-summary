'use client'

import Loading from '@/components/Loading/Loading'

import { useProfilePageContext } from '../../_hooks/ProfilePageProvider'
import BabySection from '../baby_section/BabySection'
import CategoriesSection from '../categories_section/CategoriesSection'
import ProfileSection from '../profile_section/ProfileSection'

export default function Section() {
  const profilePageContext = useProfilePageContext()
  if (profilePageContext.loading) {
    return <Loading />
  } else {
    return (
      <>
        <ProfileSection />

        <div className='w-full border-b-2 border-gray-800' />

        <BabySection />

        <div className='w-full border-b-2 border-gray-800' />

        <CategoriesSection />
      </>
    )
  }
}
