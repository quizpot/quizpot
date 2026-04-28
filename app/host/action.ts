"use server"

import { db } from "@/db"
import { auth } from "@/lib/auth"
import { quiz } from "@quizpot/quizcore/db/schema"
import { eq } from "drizzle-orm"
import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface LobbySettings {
  statusBar: boolean
  questionsOnDevice: boolean
  customNames: boolean
}

export async function createLobbyAction(
  quizId: string,
  settings: LobbySettings
): Promise<never> {
  let lobbyCode: string | null = null;

  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) redirect("/auth/signin")

    const [q] = await db.select().from(quiz).where(eq(quiz.id, quizId))
    if (!q || q.ownerId !== session.user.id) throw new Error("Unauthorized")

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOBBY_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId, settings }),
    })

    if (!res.ok) throw new Error("Server failed to create lobby")

    const data = await res.json() as { code: string; hostId: string }
    lobbyCode = data.code;

    const cookieStore = await cookies();
    cookieStore.set(`quizpot:host:${data.code}`, data.hostId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1,
      path: "/",
    })

  } catch (err) {
    if ((err as any).digest?.startsWith('NEXT_REDIRECT')) throw err;
    console.error(err)
    throw err
  }

  redirect(`/host?code=${lobbyCode}`)
}