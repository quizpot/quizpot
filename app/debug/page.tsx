import React from 'react'
import DebugPageClient from './pageClient'
import { cookies } from 'next/headers'
import DebugPageSecret from './pageSecret'
import { notFound } from 'next/navigation'

const DebugPage = async () => {
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    const cookieStore = await cookies()
    const debugCookie = cookieStore.get('debug')?.value
    const secret = process.env.DEBUG_SECRET

    if (!secret) notFound()

    if (debugCookie !== secret) {
      return <DebugPageSecret />
    }
  }

  return <DebugPageClient />
}

export default DebugPage