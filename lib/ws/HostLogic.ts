import { WebSocketClient } from "@/app/api/ws/route"
import { lobbies } from "../LobbyManager"

export function hostWSLogic(ws: WebSocketClient) {
  ws.onmessage = (event) => {
    const content = JSON.parse(event.data)

    if (content.type === 'quizUpload') {
      console.log("[HostLogic] Received quiz upload request from client:", content.hostId)
      lobbies.push({
        id: Math.floor(Math.random() * 900000 + 100000), // Generates a random number between 100000 and 999999
        hostId: content.hostId,
        quiz: JSON.parse(content.file)
      })
      
      console.log("[HostLogic] Created new a new lobby with code:", lobbies[lobbies.length - 1].id)
      
      ws.send(JSON.stringify({
        type: 'lobbyCreated',
        hostId: content.hostId,
        code: lobbies[lobbies.length - 1].id
      }))
    }
  }
}