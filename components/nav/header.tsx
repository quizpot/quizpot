import HeaderClient from './header-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  return <HeaderClient user={ session?.user } />
}

export default Header