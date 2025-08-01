import { createWSClient, deleteWSClient, getWSClientsSize, WebSocketClient } from "@/lib/managers/WSClientManager"
import { deleteLobby } from "@/lib/managers/LobbyManager"
import { emitEvent, initializeServerEventHandlers, sendEvent } from "@/lib/ws/EventManager"

export function GET() {
  console.log("GET /api/ws Upgrading connection")

  const headers = new Headers()
  headers.set('Connection', 'Upgrade')
  headers.set('Upgrade', 'websocket')

  return new Response('Upgrade Required', { status: 426, headers })
}

export function SOCKET (
  client: WebSocketClient,
) {
  client = createWSClient(client)

  sendEvent(client, 'setId', { id: client.id })

  client.onmessage = (e) => {
    const { event, ctx } = JSON.parse(e.data)
    emitEvent(event, { client, ctx })
  }

  initializeServerEventHandlers()

  console.log('SOCKET /api/ws New client connected with id: ' + client.id + ', total: ' + getWSClientsSize())

  /**
   * Cleanup everything on disconnect
   */
  return () => {
    deleteLobby(client.id)
    deleteWSClient(client)
    console.log('SOCKET /api/ws Client ' + client.id + ' disconnected, remaining: ' + getWSClientsSize())
  }
}
