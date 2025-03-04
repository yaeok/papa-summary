import CheckEmailVerifyButton from './_components/CheckEmailVerifyButton'
import ResendEmailVefiryButton from './_components/ResendEmailVerifyButton'

const Page = () => {
  return (
    <div className='px-8 py-20 justify-center items-center flex'>
      <div className='w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-lg p-8 shadow-md flex flex-col items-center gap-4'>
        <div className='text-center'>
          <p>新規登録が完了しました。</p>
          <p>メールアドレスの確認を行ってください。</p>
        </div>
        <CheckEmailVerifyButton />
        <ResendEmailVefiryButton />
      </div>
    </div>
  )
}

export default Page
