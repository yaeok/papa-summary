import { ProductProvider } from './_hooks/ProductProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ProductProvider>{children}</ProductProvider>
}
