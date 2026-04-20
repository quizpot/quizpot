import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import ProfilePageClient from "./page.client"
import FancyCard from "@/components/ui/fancy-card"
import ProfileEditor from "@/components/dashboard/user/profile-editor"

const UserPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <main className="flex flex-col gap-4">
      <FancyCard>
        <h1 className='text-4xl font-semibold'>User</h1> 
      </FancyCard>
      <ProfileEditor session={ session } />
    </main>
  )

  return <ProfilePageClient session={ session } />
}

export default UserPage