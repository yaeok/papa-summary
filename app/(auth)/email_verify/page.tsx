import { AuthRepository } from '@/infrastructure/repository/auth_repository'

const Page = () => {
  const handleVerifyEmail = async () => {
    const repository = new AuthRepository()
    const response = await repository.checkEmailVerification()
    if (response) {
      console.log('verified')
    }
  }

  const handleSendEmail = () => {
    console.log('send email')
  }
  return (
    <div className='px-2 py-20 w-full min-h-screen justify-center items-center flex'>
      <div className='w-full lg:w-1/4 bg-gray-50 rounded-lg p-4 shadow-md flex flex-col items-center gap-4'>
        <div className='text-center'>
          <p>新規登録が完了しました。</p>
          <p>メールアドレスの確認を行ってください。</p>
        </div>
        <button
          className='px-8 py-2 rounded-full bg-red-400 text-white font-semibold shadow-md
        hover:bg-red-500 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
        >
          認証しました
        </button>
        <button
          className='px-8 py-2 rounded-full bg-green-400 text-white font-semibold shadow-md
        hover:bg-green-500 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
        >
          確認メールを再送信する
        </button>
      </div>
    </div>
  )
}

export default Page
