"use client"

import { PlayerLobbyStateProvider, usePlayerLobbyState } from '@/components/providers/player-ls-provider'
import { WebSocketProvider } from '@/components/providers/ws-provider'
import Disconnected from '@/components/ui/disconnected'
import LoadingPage from '@/components/ui/loading-page'
import ScorePage from '@/components/player/pages/ScorePage'
import EndPage from '@/components/player/pages/EndPage'
import AnswersPage from '@/components/player/pages/AnswersPage'
import SlidePage from '@/components/player/pages/SlidePage'
import AnswerPage from '@/components/player/pages/AnswerPage'
import QuestionPage from '@/components/player/pages/QuestionPage'
import WaitingInLobbyPage from '@/components/player/pages/WaitingInLobbyPage'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'
import PlayerStatusLayout from '@/components/player/player-layout'

const PlaySwitch = () => {
  const { playerLobbyState } = usePlayerLobbyState()

  if (!playerLobbyState) 
    return <LoadingPage message='Waiting for player lobby state...' />

  switch (playerLobbyState.status) {
    case 'waiting':
      return <WaitingInLobbyPage playerLobbyState={ playerLobbyState } />
    case 'slide':
      return <SlidePage playerLobbyState={ playerLobbyState } />
    case 'question':
      return <QuestionPage playerLobbyState={ playerLobbyState } />
    case 'answer':
      return <AnswerPage playerLobbyState={ playerLobbyState } />
    case 'answers':
      return <AnswersPage playerLobbyState={ playerLobbyState } />
    case 'score':
      return <ScorePage playerLobbyState={ playerLobbyState } />
    case 'end':
      return <EndPage playerLobbyState={ playerLobbyState } />
    default:
      return (
        <section className="flex flex-col items-center justify-center gap-4 h-screen w-full p-4">
          <h1 className="text-2xl font-semibold">Unknown Lobby State</h1>
          <FancyButton color="yellow" asChild>
            <Link href="/">Leave</Link>
          </FancyButton>
        </section>
      )
  }
}


const PlayPageClient = ({ code }: { code: string }) => {
  return (
    <WebSocketProvider role='player' code={ code }>
      <Disconnected />
      <PlayerLobbyStateProvider>
        <PlayerStatusLayout>
          <PlaySwitch />
        </PlayerStatusLayout>
      </PlayerLobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayPageClient