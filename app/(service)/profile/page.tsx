import BabySection from './_components/Baby/BabySection'
import CategoriesSection from './_components/Categories/CategoriesSection'
// import FinanceSection from './_components/Finance/FinanceSection'
import ProfileSection from './_components/Profile/ProfileSection'

const Page = () => {
  return (
    <div className='w-full px-8 flex flex-col items-center gap-4'>
      <ProfileSection />

      <div className='w-full border-b-2 border-gray-800' />

      <BabySection />

      <div className='w-full border-b-2 border-gray-800' />

      {/* 一旦なし */}
      {/* <FinanceSection /> */}
      {/* <div className='w-full border-b-2 border-gray-800' /> */}

      <CategoriesSection />
    </div>
  )
}

export default Page
