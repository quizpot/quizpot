import { getLobbiesSize } from "@/lib/managers/LobbyManager"
import { getWSClientsSize } from "@/lib/managers/WSClientManager"

export async function GET() {
  return Response.json({ 
    lobbies: getLobbiesSize(), 
    clients: getWSClientsSize(),
  })
}