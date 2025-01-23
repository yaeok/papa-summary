import AuthGuard from '@/components/AuthGuard'
import Header from '@/components/Header'
import { CurrentUserProvider } from '@/providers/CurrentUserProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CurrentUserProvider>
      <AuthGuard>
        <div className='w-full min-h-screen'>
          <Header isSignIn={true} />
          {children}
        </div>
      </AuthGuard>
    </CurrentUserProvider>
  )
}
