import { notFound } from 'next/navigation'
import React from 'react'
import DebugPageClient from './pageClient'

const DebugPage = () => {
  const dev = process.env.NODE_ENV === 'development'

  if (!dev) {
    notFound()
  }

  return (
    <DebugPageClient />
  )
}

export default DebugPage