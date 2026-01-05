import { getDebugStats } from "@/lib/server/managers/StatManager"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export async function GET() {
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    const cookieStore = await cookies()
    const debugCookie = cookieStore.get('debug')?.value
    const secret = process.env.DEBUG_SECRET

    if (!secret) notFound()

    if (debugCookie !== secret) {
      return Response.json({}, { status: 403 })
    }
  }

  return Response.json(getDebugStats())
}