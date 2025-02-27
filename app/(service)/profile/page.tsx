import BabySection from './_components/baby_section/BabySection'
import CategoriesSection from './_components/categories_section/CategoriesSection'
import ProfileSection from './_components/profile_section/ProfileSection'

const Page = () => {
  return (
    <div className='w-full px-8 flex flex-col items-center gap-4'>
      <ProfileSection />

      <div className='w-full border-b-2 border-gray-800' />

      <BabySection />

      <div className='w-full border-b-2 border-gray-800' />

      <CategoriesSection />
    </div>
  )
}

export default Page
