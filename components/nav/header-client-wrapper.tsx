"use client"
import { useSession } from '@/lib/auth-client'
import HeaderClient from './header-client'

const HeaderClientWrapper = () => {
  const { data: session } = useSession()

  return <HeaderClient user={session?.user} />
}

export default HeaderClientWrapper