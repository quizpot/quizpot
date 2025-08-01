import { hostWSLogic } from "@/lib/ws/HostLogic"
import { quizWSLogic } from "@/lib/ws/QuizLogic"
import { createWSClient, deleteWSClient, getWSClientsSize, WebSocketClient } from "@/lib/managers/WSClientManager"

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

  // Send client assigned id
  client.send(
    JSON.stringify({
      type: 'setId',
      id: client.id
    })
  )

  console.log('SOCKET /api/ws New client connected with id: ' + client.id + ', total: ' + getWSClientsSize())

  hostWSLogic(client)
  quizWSLogic(client)

  return () => {
    deleteWSClient(client)
    console.log('SOCKET /api/ws Client ' + client.id + ' disconnected, remaining: ' + getWSClientsSize())
  }
}
