import { auth } from "@/lib/auth"
import { headers, cookies } from "next/headers" // Use native cookies
import { redirect } from "next/navigation"
import HostPageClient from "./page.client"

const HostPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) => {
  const { code } = await searchParams

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/auth/signin")

  if (!code) redirect("/dashboard/quizzes")

  const cookieStore = await cookies()
  const hostIdCookie = cookieStore.get(`quizpot:host:${code}`)
  const hostId = hostIdCookie?.value

  if (!hostId) {
    redirect("/dashboard/quizzes")
  }

  return <HostPageClient code={code} hostId={hostId} />
}

export default HostPage