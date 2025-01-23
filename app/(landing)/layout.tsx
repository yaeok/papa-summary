import Header from '@/components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header isSignIn={true} />
      <div className='p-2'>{children}</div>
    </>
  )
}
