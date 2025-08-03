"use client"
import { useLobby } from '@/components/host/LobbyProvider'
import UploadQuizPrompt from '@/components/host/UploadQuizPrompt'
import React from 'react'

const HostPage = () => {
  const lobby = useLobby().lobby

  if (!lobby) {
    return (
      <>
        <UploadQuizPrompt />
      </>
    )
  }
  
  return (
    <>
      <section className='flex flex-col gap-4 items-center justify-center h-screen w-full'>
        <h1>Code: { lobby.code }</h1>
        <p>Players: { lobby.players.length }</p>
      </section>
    </>
  )
}

export default HostPage