"use client"
import { useWebSocket } from '../providers/WebSocketProvider'
import FancyCard from './fancy-card'

const Disconnected = () => {
  const { isConnected } = useWebSocket()

  if (isConnected) return null

  return (
    <section className='fixed top-0 bg-background left-0 z-50 h-dvh w-full flex flex-col items-center justify-center'>
      <FancyCard className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
        <h1 className='text-4xl font-semibold w-full text-center'>Disconnected</h1>
        <p>Websocket disconnected, please refresh the page</p>
      </FancyCard>
    </section>
  )
}

export default Disconnected