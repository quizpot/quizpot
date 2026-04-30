"use client"

import { WebSocketProvider } from "@/components/providers/ws-provider"
import {
  HostLobbyStateProvider,
  useHostLobbyState,
} from "@/components/providers/host-ls-provder"
import AnswerPage from "@/components/host/pages/AnswerPage"
import AnswersPage from "@/components/host/pages/AnswersPage"
import EndPage from "@/components/host/pages/EndPage"
import LobbyWaitingPage from "@/components/host/pages/LobbyWaitingPage"
import QuestionPage from "@/components/host/pages/QuestionPage"
import ScoreboardPage from "@/components/host/pages/ScoreboardPage"
import SlidePage from "@/components/host/pages/SlidePage"
import FancyButton from "@/components/ui/fancy-button"
import Link from "next/link"
import LoadingPage from "@/components/ui/loading-page"
import Disconnected from "@/components/ui/disconnected"
import SkipSlide from "@/components/host/slides/SkipSlide"

const HostLobbySwitch = () => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState)
    return <LoadingPage message="Waiting for host lobby state..." />

  switch (hostLobbyState.status) {
    case "waiting":
      return <LobbyWaitingPage hostLobbyState={hostLobbyState} />
    case "slide":
      return <SlidePage hostLobbyState={hostLobbyState} />
    case "question":
      return <QuestionPage hostLobbyState={hostLobbyState} />
    case "answer":
      return <AnswerPage hostLobbyState={hostLobbyState} />
    case "answers":
      return <AnswersPage hostLobbyState={hostLobbyState} />
    case "score":
      return <ScoreboardPage hostLobbyState={hostLobbyState} />
    case "end":
      return <EndPage hostLobbyState={hostLobbyState} />
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

const HostPageClient = ({ code, hostId }: { code: string; hostId: string }) => {
  return (
    <WebSocketProvider role="host" code={code} clientId={hostId}>
      <Disconnected />
      <HostLobbyStateProvider>
        <HostLobbySwitch />
        <SkipSlide />
      </HostLobbyStateProvider>
    </WebSocketProvider>
  )
}

export default HostPageClient