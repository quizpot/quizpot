import { WebSocketClient } from "@/app/api/ws/route"
import { createLobby } from "../LobbyManager"

export function hostWSLogic(ws: WebSocketClient) {
  ws.onmessage = (event) => {
    const content = JSON.parse(event.data)

    if (content.type === 'quizUpload') {
      console.log("[HostLogic] Received quiz upload request from client:", content.hostId)

      // TODO: Validate quiz content
      const res = createLobby(content.hostId, content.quiz)

      if (res instanceof Error) {
        ws.send(JSON.stringify({
          type: 'quizUploadError',
          error: res.message
        }))
        console.log("[HostLogic] Error uploading quiz:", res.message)
        return
      }
      
      console.log("[HostLogic] Created new a new lobby with code:", res)
      
      ws.send(JSON.stringify({
        type: 'lobbyCreated',
        hostId: content.hostId,
        code: res
      }))
    }
  }
}