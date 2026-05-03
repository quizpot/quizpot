import { cn } from '@/lib/utils'
import { OTPInputContext } from 'input-otp'
import React from 'react'
import FancyButton from './fancy-button'
import { Color } from '@/lib/colors'

export function FancyOTPSlot({
  index,
  className,
  color,
  ...props
}: React.ComponentProps<"div"> & {
  index: number,
  color?: Color
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <FancyButton color={color} className='p-0' asChild>
      <div
        data-slot="input-otp-slot"
        data-active={isActive}
        className={cn(
          "relative flex h-12 w-10 items-center justify-center text-xl font-bold outline-none",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    </FancyButton>
  )
}