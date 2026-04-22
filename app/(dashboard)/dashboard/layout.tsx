import DashboardSidebar from '@/components/dashboard/sidebar/dashboard-sidebar'
import { DashboardSidebarProvider } from '@/components/dashboard/sidebar/dashboard-sidebar-provider'
import { auth } from '@/lib/auth'
import { headers, cookies } from 'next/headers'
import React from 'react'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const cookieStore = await cookies()
  const sidebarCookie = cookieStore.get('dashboard_sidebar_state')?.value
  const initialOpen = sidebarCookie === undefined ? true : sidebarCookie !== 'false'

  return (
    <main className='h-dvh w-full flex overflow-clip'>
      <DashboardSidebarProvider initialOpen={ initialOpen }>
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