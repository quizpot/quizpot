"use client"
import Header from '@/components/home/Header'
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useEffect } from 'react'

const DebugPageClient = () => {
  const t = useTranslations('StatsPage')
  const btnT = useTranslations('Buttons')

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
          <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
          <div className='flex gap-4 flex-col md:flex-row'>
            <FancyButton>
              { t('clients') }: { clients }
            </FancyButton>
            <FancyButton>
              { t('lobbies') }: { lobbies }
            </FancyButton>
            <FancyButton>
              { t('players') }: { players }
            </FancyButton>
          </div>
          <FancyButton className='mt-4' asChild>
            <Link href='/'>
              { btnT('home') }
            </Link>
          </FancyButton>
        </div>
      </section>
    </>
  )
}

export default DebugPageClient