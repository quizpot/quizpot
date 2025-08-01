import { getLobbies } from "@/lib/managers/LobbyManager"
import { getWSClientsSize } from "@/lib/managers/WSClientManager"

export async function GET() {
  return Response.json({ 
    lobbies: getLobbies().length, 
    clients: getWSClientsSize()
  })
}