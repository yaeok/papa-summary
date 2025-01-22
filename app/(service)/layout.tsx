import Header from '@/components/Header'
import Main from '@/components/Main'
import NavBar from '@/components/NavBar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <NavBar />
    </>
  )
}
