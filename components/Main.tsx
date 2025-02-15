type MainProps = {
  children: React.ReactNode
}

export default function Main({ children }: MainProps) {
  return (
    <main className='w-full max-w-screen-md mx-auto pt-4 px-4 pb-24'>
      {children}
    </main>
  )
}
