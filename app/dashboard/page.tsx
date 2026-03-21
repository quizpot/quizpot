import { useSession } from '@/lib/auth-client'

const DashboardPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      { session?.user.name }
    </div>
  )
}

export default DashboardPage