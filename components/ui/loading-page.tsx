import { Loader2 } from 'lucide-react'

const LoadingPage = ({ message }: { message?: string }) => {
  return (
    <main className='h-dvh w-full flex items-center justify-center gap-4 flex-col'>
      <Loader2 className='animate-spin' />
      <h1 className='max-w-sm text-2xl'>{ message || 'Loading...' }</h1>
    </main>
  )
}

export default LoadingPage