import { cn } from "@/lib/utils"
import { useDashboardSidebar } from "./dashboard-sidebar-provider"

const DashboardSidebarLabel = ({
  icon,
  label,
  className
}: {
  icon: React.ReactNode,
  label: string,
  className?: string
}) => {
  const { isContentVisible } = useDashboardSidebar()

  return (
    <div
      className={ cn('text-xs px-2 py-1 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-neutral-500', className) }
    >
      { icon }
      { isContentVisible && label }
    </div>
  )
}

export default DashboardSidebarLabel