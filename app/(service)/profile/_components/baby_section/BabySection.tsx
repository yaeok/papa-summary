import { useProfilePageContext } from '../../_hooks/ProfilePageProvider'
import UpdateBabyButton from './update_baby/UpdateBabyButton'

export default function BabySection() {
  const profilePageContext = useProfilePageContext()
  const babyInfo = profilePageContext.baby
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1>赤ちゃん情報</h1>

      <div className='w-full'>
        {babyInfo !== null ? (
          <>
            <div className='flex flex-row justify-between'>
              <p>呼び名</p>
              <p>{babyInfo.getName()}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p>予定日</p>
              <p>
                {babyInfo.getBirthDate() !== null
                  ? new Date(babyInfo.getBirthDate()!).toLocaleDateString()
                  : '未設定'}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-row justify-between'>
              <p>呼び名</p>
              <p>未設定</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p>予定日</p>
              <p>未設定</p>
            </div>
          </>
        )}
      </div>
      <UpdateBabyButton />
    </div>
  )
}
