"use client"
import FancyButton from "../../ui/fancy-button"
import { Book, ChartArea, Home, PanelLeftClose, PanelLeftOpen, PanelsTopLeft, Shield, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardSidebarButton from "./dashboard-sidebar-button"
import { auth } from "@/lib/auth"
import { useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useDashboardSidebar } from "./dashboard-sidebar-provider"
import DashboardSidebarLabel from "./dashboard-sidebar-label"
import DynamicIcon from "@/components/ui/icon"

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

const DashboardSidebar = ({ session }: { session: Session }) => {
  const { open, setOpen, isContentVisible } = useDashboardSidebar()
  const t = useTranslations('DashboardSidebar')

  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }, [setOpen])

  return (
    <section className={ cn("h-dvh bg-neutral-200 dark:bg-neutral-800 flex duration-300 flex-col overflow-hidden", open ? "min-w-screen md:min-w-80" : "min-w-22") }>
      <div className="flex justify-between p-4">
        {
          isContentVisible && (
            <FancyButton color="foreground" className="font-semibold text-xl" asChild>
              <Link href="/">
                Quizpot
              </Link>
            </FancyButton>
          )
        }
        {
          open && (
            <FancyButton onClick={ () => setOpen(false) }>
              <PanelLeftClose />
            </FancyButton>
          )
        }
        {
          !open && (
            <div></div>
          )
        }
        {
          !open && (
            <FancyButton onClick={ () => setOpen(true) }>
              <PanelLeftOpen />
            </FancyButton>
          )
        }
      </div>
      <div className="flex-1 w-full overflow-y-auto p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <DashboardSidebarLabel icon={ <Home size={16} /> } label={ t('home') } />
          {/* <DashboardSidebarButton href="/dashboard" icon={ <PanelsTopLeft /> } label={ t('dashboard') } /> */}
          <DashboardSidebarButton href="/dashboard/quizzes" icon={ <Book /> } label={ t('quizzes') } />
        </div>
        {
          session?.user.role === 'admin' && (
            <div className="flex flex-col gap-2">
              <DashboardSidebarLabel icon={ <Shield size={16} /> } label={ t('admin') } />
              <DashboardSidebarButton href="/dashboard/admin/stats" icon={ <ChartArea /> } label={ t('stats') } />
              <DashboardSidebarButton href="/dashboard/admin/users" icon={ <Users /> } label={ t('users') } />
            </div>
          )
        }
      </div>
      <div className="p-4">
        <FancyButton 
          color="foreground" 
          className="flex gap-4 items-center w-full" 
          asChild
          onClick={() => window.innerWidth < 768 && setOpen(false)}
        >
          <Link href="/dashboard/user">
            <DynamicIcon name={ session?.user.icon } style={{ color: session?.user.color }} />
            { isContentVisible && session?.user.name }
          </Link>
        </FancyButton>
      </div>
    </section>
  )
}

export default DashboardSidebar