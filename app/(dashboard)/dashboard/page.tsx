import { auth } from "@/lib/auth"
import DashboardPageClient from "./page.client"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  redirect('/dashboard/quizzes')

  return <DashboardPageClient session={ session } />
}

export default DashboardPage