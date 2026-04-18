import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import ProfilePageClient from "./page.client"

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return <ProfilePageClient session={ session } />
}

export default ProfilePage