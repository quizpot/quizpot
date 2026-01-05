"use client"
import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import StatCountChart from '@/components/stats/StatCountChart'
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

type TimeFilter = 'max' | 10 | 1

const DebugPageClient = () => {
  const t = useTranslations('StatsPage')

  const [timeFilter, setTimeFilter] = React.useState<TimeFilter>('max')
  const [stats, setStats] = React.useState<{
    clients: { timestamp: Date, value: number }[],
    players: { timestamp: Date, value: number }[],
    lobbies: { timestamp: Date, value: number }[],
    processCPU: { timestamp: Date, value: number }[],
    processMemory: { timestamp: Date, value: number }[],
  }>({ clients: [], players: [], lobbies: [], processCPU: [], processMemory: [] })

  useEffect(() => {
    const fetchStats = () => {
      fetch('/api/debug')
        .then(res => res.json())
        .then(data => {
          const formattedData = {
            clients: data.clients.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) })),
            players: data.players.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) })),
            lobbies: data.lobbies.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) })),
            processCPU: data.processCPU.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) })),
            processMemory: data.processMemory.map((s: any) => ({ ...s, timestamp: new Date(s.timestamp) })),
          }
          setStats(formattedData)
        })
        .catch(err => console.error("Stats fetch failed", err))
    }

    fetchStats()
    const interval = setInterval(fetchStats, 1000 * 5)
    return () => clearInterval(interval)
  }, [])

  const filteredStats = useMemo(() => {
    if (timeFilter === 'max') return stats

    const now = new Date().getTime()
    const cutoff = now - (timeFilter * 60 * 1000)

    const filterFn = (data: { timestamp: Date, value: number }[]) => 
      data.filter(item => item.timestamp.getTime() >= cutoff)

    return {
      clients: filterFn(stats.clients),
      players: filterFn(stats.players),
      lobbies: filterFn(stats.lobbies)
    }
  }, [stats, timeFilter])

  return (
    <>
      <Header />
      <h1 className='text-4xl font-semibold text-center mt-32 py-16'>{t('title')}</h1>
      <section className='container w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 p-4'>
        <FancyButton 
          onClick={() => setTimeFilter('max')}
          className={timeFilter !== 'max' ? 'opacity-50' : ''}
        >
          Max (All Time)
        </FancyButton>
        <FancyButton 
          onClick={() => setTimeFilter(10)}
          className={timeFilter !== 10 ? 'opacity-50' : ''}
        >
          Last 10 Minutes
        </FancyButton>
        <FancyButton 
          onClick={() => setTimeFilter(1)}
          className={timeFilter !== 1 ? 'opacity-50' : ''}
        >
          Last 1 Minute
        </FancyButton>
      </section>
      <section className='container w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        <StatCountChart title="Clients" data={filteredStats.clients} 
          chartConfig={{ value: { label: "Clients", color: "var(--chart-1)" } }}
        />
        <StatCountChart title="Players" data={filteredStats.players} 
          chartConfig={{ value: { label: "Players", color: "var(--chart-2)" } }} 
        />
        <StatCountChart title="Lobbies" data={filteredStats.lobbies} 
          chartConfig={{ value: { label: "Lobbies", color: "var(--chart-3)" } }} 
        />
      </section>
      <Footer />
    </>
  )
}

export default DebugPageClient