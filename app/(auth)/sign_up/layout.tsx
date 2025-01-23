import Header from '@/components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='w-full min-h-screen'>
      <Header isSignIn={false} />
      {children}
    </div>
  )
}
