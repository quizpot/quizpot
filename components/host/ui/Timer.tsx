import FancyCard from '@/components/ui/fancy-card'
import React, { useEffect } from 'react'

const Timer = ({ from }: { from: number }) => {
  const [time, setTime] = React.useState(from)

  useEffect(() => {
    if (from <= 0) {
      return
    }
    
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime - 1 <= 0) {
          clearInterval(interval)
        }
        
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [from])

  return (
    <FancyCard className='h-24 w-24 rounded-full p-4 flex items-center justify-center font-semibold text-4xl'>
      { time }
    </FancyCard>
  )
}

export default Timer