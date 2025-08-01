/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendEvent } from "./EventManager"
import { createLobby } from "@/lib/managers/LobbyManager"
import { WebSocketClient } from "@/lib/managers/WSClientManager"

// Define a common interface for the handler's context
interface HandlerContext {
  client: WebSocketClient
  ctx: any
}

/**
 * Handles the 'quizUpload' event from a host client.
 * This function is registered with the server's event manager.
 */
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

    console.log(`[HostHandlers] Lobby created for host ${hostId} with code: ${newLobbyCode}`)

    // Send a success event back to the client
    sendEvent(client, 'lobbyCreated', {
      code: newLobbyCode,
      hostId,
    })
  } catch (error) {
    console.error(`[HostHandlers] Error handling quiz upload for host ${hostId}:`, error)

    sendEvent(client, 'quizUploadError', {
      error: "Invalid quiz file format or an unexpected error occurred.",
    })
  }
}