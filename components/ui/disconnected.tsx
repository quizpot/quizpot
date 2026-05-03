"use client"
import { useEffect, useState } from 'react'
import FancyCard from './fancy-card'
import { useWebSocket } from '../providers/ws-provider'

const Disconnected = () => {
  const { isConnected } = useWebSocket()
  const [hasConnectedOnce, setHasConnectedOnce] = useState(false)

  useEffect(() => {
    if (isConnected) {
      setHasConnectedOnce(true)
    }
  }, [isConnected])

  if (isConnected) return null

  if (!hasConnectedOnce) return null

  return (
    <section className='fixed top-0 backdrop-blur-3xl left-0 z-50 h-dvh w-full flex flex-col items-center justify-center'>
      <FancyCard className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
        <h1 className='text-4xl font-semibold w-full text-center'>Disconnected</h1>
        <p>Trying to reconnect ...</p>
      </FancyCard>
    </section>
  )
}

export default Disconnected