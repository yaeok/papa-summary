type MainProps = {
  children: React.ReactNode
}

export default function Main({ children }: MainProps) {
  return (
    <main className='w-full min-h-screen max-w-screen-md mx-auto p-4'>
      {children}
    </main>
  )
}
