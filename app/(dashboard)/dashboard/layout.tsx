import DashboardSidebar from '@/components/dashboard/sidebar/dashboard-sidebar'
import { DashboardSidebarProvider } from '@/components/dashboard/sidebar/dashboard-sidebar-provider'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <main className='h-dvh w-full flex overflow-clip'>
      <DashboardSidebarProvider>
        <DashboardSidebar session={ session } />
      </DashboardSidebarProvider>
      <section className='h-dvh w-full overflow-y-scroll'>
        <div className='p-4 container mx-auto'>
          { children }
        </div>
      </section>
    </main>
  )
}

export default DashboardLayout