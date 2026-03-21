import { auth } from "@/lib/auth"
import DashboardPageClient from "./page.client"
import { headers } from "next/headers"

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return <DashboardPageClient session={ session } />
}

export default DashboardPage