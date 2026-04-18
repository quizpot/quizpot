"use client"
import FancyButton from "../ui/fancy-button"
import { ChartArea, Home, PanelLeftClose, PanelLeftOpen, PanelsTopLeft, Shield, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import DynamicIcon from "../ui/icon"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { signOut } from "@/lib/auth-client"
import DashboardSidebarLabel from "./DashboardSiderbarLabel"
import DashboardSidebarButton from "./DashboardSidebarButton"
import { auth } from "@/lib/auth"
import { useDashboardSidebar } from "./DashboardSidebarProvider"
import { useEffect, useState } from "react"
import Link from "next/link"

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

const DashboardSidebar = ({ session }: { session: Session }) => {
  const { open, setOpen } = useDashboardSidebar()
  const [expanded, setExpanded] = useState(open)

  useEffect(() => {
    if (expanded) {
      const t = setTimeout(() => setOpen(true), 100)
      return () => clearTimeout(t)
    } else {
      setOpen(false)
    }
  }, [expanded])

  return (
    <section className={ cn("h-dvh bg-neutral-900 flex duration-300 flex-col overflow-hidden", expanded ? "min-w-screen md:min-w-80" : "min-w-22") }>
      <div className="flex justify-between p-4">
        {
          open && (
            <FancyButton className="font-semibold text-xl" asChild>
              <Link href="/">
                Quizpot
              </Link>
            </FancyButton>
          )
        }
        {
          open && (
            <FancyButton onClick={ () => setExpanded(false) }>
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
            <FancyButton onClick={ () => setExpanded(true) }>
              <PanelLeftOpen />
            </FancyButton>
          )
        }
      </div>
      <div className="flex-1 w-full overflow-y-auto p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <DashboardSidebarLabel icon={ <Home size={16} /> } label="Home" />
          <DashboardSidebarButton href="/dashboard" icon={ <PanelsTopLeft /> } label="Dashboard" />
          <DashboardSidebarButton href="/dashboard/profile" icon={ <User /> } label="Profile" />
        </div>
        {
          session?.user.role === 'admin' && (
            <div className="flex flex-col gap-4">
              <DashboardSidebarLabel icon={ <Shield size={16} /> } label="Admin" />
              <DashboardSidebarButton href="/dashboard/admin/stats" icon={ <ChartArea /> } label="Stats" />
              <DashboardSidebarButton href="/dashboard/admin/users" icon={ <Users /> } label="Users" />
            </div>
          )
        }
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-xl m-4">
            <FancyButton color="ghost" className="flex gap-4 items-center w-full">
              <DynamicIcon name={ session?.user.icon } style={{ color: session?.user.color }} />
              { open && session?.user.name }
            </FancyButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={ () => { signOut({ fetchOptions: { onSuccess: () => { window.location.reload() } } }) } }>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}

export default DashboardSidebar