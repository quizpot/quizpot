import React from 'react'
import { Color } from '@/lib/colors'
import Link from 'next/link'
import { useDashboardSidebar } from './dashboard-sidebar-provider'
import FancyButton from '@/components/ui/fancy-button'

const DashboardSidebarButton = ({
  icon,
  label,
  color,
  href,
  ...props 
}: React.ComponentProps<"button"> & {
  icon: React.ReactNode,
  color?: Color,
  href: string,
  label: string
}) => {
  const { setOpen, isContentVisible } = useDashboardSidebar()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.innerWidth < 768) {
      setOpen(false)
    }
    props.onClick?.(e)
  }
  
  return (
    <FancyButton className="flex gap-4" { ...props } asChild onClick={handleClick}>
      <Link href={ href }>
        { icon }
        { isContentVisible && label }
      </Link>
    </FancyButton>
  )
}

export default DashboardSidebarButton