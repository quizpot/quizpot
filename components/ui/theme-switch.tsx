"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import FancyButton from "./fancy-button"
import FancyCard from "./fancy-card"
import { Color } from "@/lib/colors"
import { cn } from "@/lib/utils"

export function ThemeSwitch({
  color,
  className
}: {
  color?: Color,
  className?: string
}) {
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger color={ color } className={ cn("flex", className) }>
        <Sun className="h-8 w-8 md:h-[1.2rem] md:w-[1.2rem] block dark:hidden" />
        <Moon className="h-8 w-8 md:h-[1.2rem] md:w-[1.2rem] hidden dark:block" />
        <span className="sr-only">Toggle theme</span>
      </DialogTrigger>
      <DialogContent className="min-w-sm">
        <DialogHeader title="Theme Settings" />
        <div className="p-4 flex flex-col gap-4">
          <FancyButton 
            onClick={() => { setTheme("light"); setOpen(false); }}
            className="w-full flex items-center justify-start"
          >
            <Sun className="mr-4" size={20} /> Light
          </FancyButton>
          <FancyButton 
            onClick={() => { setTheme("dark"); setOpen(false); }}
            className="w-full flex items-center justify-start"
          >
            <Moon className="mr-4" size={20} /> Dark
          </FancyButton>
          <FancyButton 
            onClick={() => { setTheme("system"); setOpen(false); }}
            className="w-full flex items-center justify-start"
          >
            <Monitor className="mr-4" size={20} /> System
          </FancyButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
