import HeaderClient from './header-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { User } from 'better-auth'

const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  return <HeaderClient user={ session?.user as User | undefined } />
}

export default Header