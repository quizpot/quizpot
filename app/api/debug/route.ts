import { getGlobalPlayerCount, getLobbiesSize } from "@/lib/server/managers/LobbyManager"
import { getWSClientsSize } from "@/lib/server/managers/WSClientManager"

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'Not in development mode' }, { status: 403 })
  }

  return Response.json({ 
    lobbies: getLobbiesSize(), 
    clients: getWSClientsSize(),
    players: getGlobalPlayerCount(),
    memory: process.memoryUsage(),
  })
}