import { TaskProvider } from './_hooks/TaskProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <TaskProvider>{children}</TaskProvider>
}
