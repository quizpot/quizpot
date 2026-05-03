"use client"

import BooleanInput from "@/components/ui/BooleanInput"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import FancyButton from "@/components/ui/fancy-button"
import { useState, useTransition } from "react"
import { createLobbyAction } from "@/app/(game)/host/action"
import NumberInput from "@/components/ui/number-input"

const HostQuizDialog = ({ quizId }: { quizId: string }) => {
  const [open, setOpen] = useState(false)
  const [customNames, setCustomNames] = useState(false)
  const [showLink, setShowLink] = useState(true)
  const [joinMidGame, setJoinMidGame] = useState(true)
  const [playerLimit, setPlayerLimit] = useState(false)
  const [limit, setLimit] = useState(20)
  const [questionsOnDevice, setQuestionsOnDevice] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleHost = () => {
    setError(null)
    startTransition(async () => {
      try {
        await createLobbyAction(quizId, {
          customNames,
          showLink,
          joinMidGame,
          playerLimit: {
            enabled: playerLimit,
            limit,
          },
          displayOnDevice: questionsOnDevice,
        })
      } catch (err) {
        if (err instanceof Error && err.message !== "NEXT_REDIRECT") {
          setError("Failed to create lobby. Please try again.")
        }
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger color="green">Host</DialogTrigger>
      <DialogContent>
        <DialogHeader title="Host Quiz" />
        <div className="p-4 text-center flex flex-col gap-4">
          <BooleanInput
            className="w-full"
            value={customNames}
            onChange={() => setCustomNames(!customNames)}
          >
            Allow Custom Names
          </BooleanInput>
          <BooleanInput
            className="w-full"
            value={questionsOnDevice}
            onChange={() => setQuestionsOnDevice(!questionsOnDevice)}
          >
            Show Questions To Players
          </BooleanInput>
          <BooleanInput
            className="w-full"
            value={showLink}
            onChange={() => setShowLink(!showLink)}
          >
            Show Link In Game
          </BooleanInput>
          <BooleanInput
            className="w-full"
            value={joinMidGame}
            onChange={() => setJoinMidGame(!joinMidGame)}
          >
            Allow Players To Join Mid Game
          </BooleanInput>
          <BooleanInput
            className="w-full"
            value={playerLimit}
            onChange={() => setPlayerLimit(!playerLimit)}
          >
            Limit Players
          </BooleanInput>
          {
            playerLimit && (
              <NumberInput
                className="w-full text-center"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                min={1}
                max={100}
              />
            )
          }

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <FancyButton
            color="blue"
            className="w-full"
            onClick={handleHost}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Host Quiz"}
          </FancyButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HostQuizDialog