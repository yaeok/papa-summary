import { TaskListPageProvider } from './_hooks/TaskListPageProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <TaskListPageProvider>{children}</TaskListPageProvider>
}
