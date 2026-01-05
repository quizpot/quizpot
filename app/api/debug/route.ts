import { getDebugStats } from "@/lib/server/managers/StatManager"

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'Not in development mode' }, { status: 403 })
  }

  return Response.json(getDebugStats())
}