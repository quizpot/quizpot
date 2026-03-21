import { cn } from "@/lib/utils"
import FancyCard from "../ui/fancy-card"
import { Color } from "@/lib/Colors"
import { useDashboardSidebar } from "./DashboardSidebarProvider"

const DashboardSidebarLabel = ({
  icon,
  label,
  className,
  color
}: {
  icon: React.ReactNode,
  label: string,
  className?: string,
  color?: Color
}) => {
  const { open } = useDashboardSidebar()

  return (
    <FancyCard
      className={ cn('text-xs px-2 py-1 flex items-center justify-center gap-2', className) }
      color={ color }
    >
      { icon }
      { open && label }
    </FancyCard>
  )
}

export default DashboardSidebarLabel