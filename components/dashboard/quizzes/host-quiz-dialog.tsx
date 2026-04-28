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
import { createLobbyAction } from "@/app/host/action"

const HostQuizDialog = ({ quizId }: { quizId: string }) => {
  const [open, setOpen] = useState(false)
  const [customNames, setCustomNames] = useState(false)
  const [statusBar, setStatusBar] = useState(true)
  const [questionsOnDevice, setQuestionsOnDevice] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleHost = () => {
    setError(null)
    startTransition(async () => {
      try {
        await createLobbyAction(quizId, {
          statusBar,
          questionsOnDevice,
          customNames,
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
            value={statusBar}
            onChange={() => setStatusBar(!statusBar)}
          >
            Show Status Bar
          </BooleanInput>
          <BooleanInput
            className="w-full"
            value={questionsOnDevice}
            onChange={() => setQuestionsOnDevice(!questionsOnDevice)}
          >
            Show Questions on Player Devices
          </BooleanInput>
          <BooleanInput
            className="w-full"
            value={customNames}
            onChange={() => setCustomNames(!customNames)}
          >
            Allow Custom Nicknames
          </BooleanInput>

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