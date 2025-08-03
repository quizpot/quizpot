import { sendEvent } from "../managers/EventManager"
import { createLobby, getLobbyByCode } from "@/lib/managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"

export function handleQuizUpload({ client, ctx }: HandlerContext) {
  const { hostId, file } = ctx

  if (!hostId || !file) {
    return sendEvent(client, 'quizUploadError', {
      error: "Host ID or quiz file content is missing.",
    })
  }

  try {
    // Assuming the 'file' content is a JSON string of the quiz data.
    const quizData = JSON.parse(file)
    const newLobbyCode = createLobby(hostId, quizData)

    if (typeof newLobbyCode !== 'number') {
      throw new Error("Unexpected error creating lobby")
    }

    console.log(`[HostHandlers] Lobby created for host ${hostId} with code: ${newLobbyCode}`)

    // Send a success event back to the client
    sendEvent(client, 'lobbyCreated', {
      lobby: getLobbyByCode(newLobbyCode),
    })
  } catch (error) {
    console.error(`[HostHandlers] Error handling quiz upload for host ${hostId}:`, error)

    sendEvent(client, 'quizUploadError', {
      error: "Invalid quiz file format or an unexpected error occurred.",
    })
  }
}
