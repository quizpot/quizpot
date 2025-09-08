"use client"
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import React, { useEffect } from 'react'

const SkipSlide = () => {
  const { sendEvent } = useWebSocket()

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        sendEvent('nextQuestion', {})
      }
    }

    document.addEventListener("keydown", keyDown)

    return () => document.removeEventListener("keydown", keyDown)
  }, [sendEvent])

  return <></>
}

export default SkipSlide