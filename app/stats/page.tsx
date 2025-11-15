"use client"
import Header from '@/components/home/Header'
import Button from '@/components/ui/ButtonOld'
import React, { useEffect } from 'react'

const DebugPageClient = () => {
  const [clients, setClients] = React.useState(0)
  const [lobbies, setLobbies] = React.useState(0)
  const [players, setPlayers] = React.useState(0)

  useEffect(() => {
    setInterval(() => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
          setClients(data.clients)
          setLobbies(data.lobbies)
          setPlayers(data.players)
        })
    }, 1000)
  }, [])

  return (
    <>
      <Header />
      <section className='w-full min-h-screen flex flex-col items-center justify-center p-4'>
        <div className='p-4 flex flex-col gap-4 text-center'>
          <h1 className='text-2xl font-semibold'>Instance Stats</h1>
          <div className='flex gap-4 flex-col md:flex-row'>
            <Button>
              Clients: { clients }
            </Button>
            <Button>
              Lobbies: { lobbies }
            </Button>
            <Button>
              Players: { players }
            </Button>
          </div>
          <Button href={'/'} variant='gray' className='mt-4'>
            Home
          </Button>
        </div>
      </section>
    </>
  )
}

export default DebugPageClient