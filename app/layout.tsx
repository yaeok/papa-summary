import type { Metadata } from 'next'
import './globals.css'

import { Kiwi_Maru } from 'next/font/google'

const kiwi_maru = Kiwi_Maru({
  subsets: ['latin'],
  weight: '300',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PaPa Summry',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${kiwi_maru.className} antialiased`}>{children}</body>
    </html>
  )
}
