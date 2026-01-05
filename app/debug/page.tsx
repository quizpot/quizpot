import { notFound } from 'next/navigation'
import React from 'react'
import DebugPageClient from './pageClient'
import { cookies } from 'next/headers'

const DebugPage = async () => {
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    const cookieStore = await cookies()
    const debugCookie = cookieStore.get('debug')?.value

    if (debugCookie !== process.env.DEBUG_SECRET) {
      notFound()
    }
  }

  return <DebugPageClient />
}

export default DebugPage