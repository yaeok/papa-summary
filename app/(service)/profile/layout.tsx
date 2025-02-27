import { CategoryProvider } from '@/providers/CategoryProvider'

import { ProfilePageProvider } from './_hooks/ProfilePageProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProfilePageProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </ProfilePageProvider>
  )
}
