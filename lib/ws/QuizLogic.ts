import { WebSocketClient } from "@/app/api/ws/route"
import { joinLobby } from "../LobbyManager"

export function quizWSLogic(ws: WebSocketClient) { // ws is the conntected client
  ws.onmessage = (event) => {
    const content = JSON.parse(event.data)

    if (content.type === 'lobbyJoin') {
      console.log("[HostLogic] Received lobby join request from client:", ws.id)

      const res = joinLobby(content.code, ws)

      if (res instanceof Error) {
        ws.send(JSON.stringify({
          type: 'lobbyJoinError',
          error: res.message
        }))
        return
      }
      
      console.log("[HostLogic] Joined a lobby with code:", res)
      
      ws.send(JSON.stringify({
        type: 'lobbyJoined',
        code: res
      }))
    }
  }
}