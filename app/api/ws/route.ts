import { createWSClient, deleteWSClient, getWSClientsSize, WebSocketClient } from "@/lib/server/managers/WSClientManager"
import { deleteLobby, getLobbyByHostId, getLobbyByPlayerId, leaveLobby } from "@/lib/server/managers/LobbyManager"
import { emitEvent, initializeServerEventHandlers, sendEvent } from "@/lib/server/managers/EventManager"

export function GET() {
  const headers = new Headers()
  headers.set('Connection', 'Upgrade')
  headers.set('Upgrade', 'websocket')

  return new Response('Upgrade Required', { status: 426, headers })
}

export function UPGRADE(client: WebSocketClient) {
  initializeServerEventHandlers()
  client = createWSClient(client)

  sendEvent(client, 'setId', { id: client.id })

  // Handle incoming events
  client.onmessage = (e) => {
    try {
      const { event, ctx } = JSON.parse(e.data.toString())
      emitEvent(event, { client, ctx })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('SOCKET /api/ws Error parsing message:', error)
      }
    }
  }

  console.log('SOCKET /api/ws New client connected, total: ' + getWSClientsSize())

  client.once('close', () => {
    if (getLobbyByHostId(client.id)) {
      deleteLobby(client)
    }

    if (getLobbyByPlayerId(client.id)) {
      leaveLobby(client)
    }

    deleteWSClient(client)

    console.log('SOCKET /api/ws Client disconnected, remaining: ' + getWSClientsSize())
  })
}
