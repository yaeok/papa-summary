import BabyInfoSection from './_components/BabyInfo/BabyInfoSection'
// import FinanceSection from './_components/Finance/FinanceSection'
import ProfileSection from './_components/Profile/ProfileSection'
import CategoriesSection from './_components/Categories/CategoriesSection'

const Page = () => {
  return (
    <div className='w-full px-8 flex flex-col items-center gap-4'>
      <ProfileSection />

      <div className='w-full border-b-2 border-gray-800' />

      <BabyInfoSection />

      <div className='w-full border-b-2 border-gray-800' />

      {/* 一旦なし */}
      {/* <FinanceSection /> */}

      <div className='w-full border-b-2 border-gray-800' />

      <CategoriesSection />
    </div>
  )
}

export default Page
