import Header from '@/components/Header'
import Main from '@/components/Main'
import NavBar from '@/components/NavBar'
import { CurrentUserProvider } from '@/providers/CurrentUserProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CurrentUserProvider>
      <Header />
      <Main>{children}</Main>
      <NavBar />
    </CurrentUserProvider>
  )
}
