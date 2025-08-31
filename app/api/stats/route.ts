import { getLobbiesSize, getGlobalPlayerCount } from "@/lib/server/managers/LobbyManager"
import { getWSClientsSize } from "@/lib/server/managers/WSClientManager"

export async function GET() {
  return Response.json({ 
    lobbies: getLobbiesSize(), 
    clients: getWSClientsSize(),
    players: getGlobalPlayerCount(),
  })
}