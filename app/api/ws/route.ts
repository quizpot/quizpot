import { hostWSLogic } from "@/lib/ws/HostLogic"
import { quizWSLogic } from "@/lib/ws/QuizLogic"
import { randomUUID } from "crypto"

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
  // console.log('SOCKET /api/ws Handling socket connection')

  client.id = randomUUID()
  clients.push(client)

  // Send client assigned id
  client.send(
    JSON.stringify({
      type: 'id',
      id: client.id
    })
  )

  console.log('SOCKET /api/ws New client connected with id: ' + client.id + ', total: ' + clients.length)

  hostWSLogic(client)
  quizWSLogic(client)

  return () => {
    clients.splice(clients.indexOf(client), 1)
    console.log('SOCKET /api/ws Client ' + client.id + ' disconnected, remaining: ' + clients.length)
  }
}

export interface WebSocketClient extends WebSocket {
  id: string
}

// Keep track of all connected clients
export const clients: WebSocketClient[] = []