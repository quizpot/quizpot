"use client"
import { useWebSocket } from '@/components/providers/ws-provider'
import { useEffect } from 'react'

const SkipSlide = () => {
  const { sendEvent } = useWebSocket()

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        sendEvent('NEXT_STEP')
      }
    }

    document.addEventListener("keydown", keyDown)

    return () => document.removeEventListener("keydown", keyDown)
  }, [sendEvent])

  return <></>
}

export default SkipSlide