"use client"
import Header from '@/components/home/Header'
import Button from '@/components/ui/Button'
import React, { useEffect } from 'react'

const DebugPageClient = () => {
  const [clients, setClients] = React.useState(0)
  const [lobbies, setLobbies] = React.useState(0)
  const [players, setPlayers] = React.useState(0)
  const [memory, setMemory] = React.useState<NodeJS.MemoryUsage | null>(null)

  useEffect(() => {
    setInterval(() => {
      fetch('/api/debug')
        .then(res => res.json())
        .then(data => {
          setClients(data.clients)
          setLobbies(data.lobbies)
          setPlayers(data.players)
          setMemory(data.memory)
        })
    }, 1000)
  }, [])

  return (
    <>
      <Header />
      <section className='w-full min-h-screen flex flex-col items-center justify-center p-4'>
        <div className='p-4 flex flex-col gap-4 text-center'>
          <h1 className='text-2xl font-semibold'>Debug</h1>
          <p>Clients: { clients }</p>
          <p>Lobbies: { lobbies }</p>
          <p>Players: { players }</p>
          {
            memory ?
              <p>Memory: { Math.floor(memory.heapUsed / 1000000) } / { Math.floor(memory.heapTotal / 1000000) }MB</p>
              :
              <p>Memory: Loading...</p>
          }
          <Button href={'/'} variant='gray' className='mt-4'>
            Home
          </Button>
        </div>
      </section>
    </>
  )
}

export default DebugPageClient