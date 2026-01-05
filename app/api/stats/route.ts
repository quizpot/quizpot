import { getStats } from "@/lib/server/managers/StatManager"

export async function GET() {
  return Response.json(getStats())
}