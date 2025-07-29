import { getLobbies } from "@/lib/LobbyManager"
import { clients } from "../ws/route"

export async function GET() {
  return Response.json({ 
    lobbies: getLobbies().length, 
    clients: clients.length 
  })
}