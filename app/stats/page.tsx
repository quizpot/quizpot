"use client"
import React, { useEffect } from 'react'

const StatsPage = () => {
  const [lobbyCount, setLobbyCount] = React.useState(0)
  const [clientCount, setClientCount] = React.useState(0)

  useEffect(() => {
    setInterval(() => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
          console.log(data)
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