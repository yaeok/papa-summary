import CheckEmailVerifyButton from './_components/CheckEmailVerifyButton'
import ResendEmailVefiryButton from './_components/ResendEmailVerifyButton'

const Page = () => {
  return (
    <div className='px-2 py-20 justify-center items-center flex'>
      <div className='w-full lg:w-1/4 bg-gray-50 rounded-lg p-4 shadow-md flex flex-col items-center gap-4'>
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
