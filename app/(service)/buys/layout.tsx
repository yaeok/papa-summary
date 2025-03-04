import { CategoryProvider } from '@/providers/CategoryProvider'

import { ProductListPageProvider } from './_hooks/ProductListPageProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProductListPageProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </ProductListPageProvider>
  )
}
