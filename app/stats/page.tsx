"use client"
import { getLobbies } from '@/lib/LobbyManager'
import React, { useEffect } from 'react'
import { clients } from '../api/ws/route'

const StatsPage = () => {
  const [lobbyCount, setLobbyCount] = React.useState(getLobbies().length)
  const [clientCount, setClientCount] = React.useState(clients.length)

  useEffect(() => {
    setInterval(() => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
          setLobbyCount(data.lobbies)
          setClientCount(data.clients)
        })
    }, 1000)
  }, [])

  return (
    <>
      <p>Lobby count: { lobbyCount }</p>
      <p>Websocket count: { clientCount }</p>
    </>
  )
}

export default StatsPage