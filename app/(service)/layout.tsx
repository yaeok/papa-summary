import Header from '@/components/Header'
import Main from '@/components/Main'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header isSignInPage />
      <Main>{children}</Main>
    </>
  )
}
