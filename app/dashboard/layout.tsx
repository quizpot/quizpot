import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  if (!session) redirect('/auth/signin')

  return (
    <main className='h-dvh w-full flex md:items-center md:justify-center'>
      { children }
    </main>
  )
}

export default DashboardLayout