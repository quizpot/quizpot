import React from 'react'
import FancyButton from '../ui/fancy-button'
import { Color } from '@/lib/Colors'
import Link from 'next/link'
import { useDashboardSidebar } from './DashboardSidebarProvider'

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
  const { open } = useDashboardSidebar()
  
  return (
    <FancyButton className='flex gap-4' { ...props } asChild>
      <Link href={ href }>
        { icon }
        { open && label }
      </Link>
    </FancyButton>
  )
}

export default DashboardSidebarButton