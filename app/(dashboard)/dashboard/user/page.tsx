import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import FancyCard from "@/components/ui/fancy-card"
import ProfileEditor from "@/components/dashboard/user/profile-editor"
import PasswordEditor from "@/components/dashboard/user/password-editor"
import { Session } from "@/lib/session"
import UserDangerZone from "@/components/dashboard/user/danger-zone"

const UserPage = async () => {
  const session: Session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <main className="flex flex-col gap-4">
      <FancyCard>
        <h1 className='text-4xl font-semibold'>User</h1> 
      </FancyCard>
      <ProfileEditor user={ session!.user } />
      <PasswordEditor />
      <UserDangerZone />
    </main>
  )
}

export default UserPage