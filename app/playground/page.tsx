import { notFound } from 'next/navigation'
import React from 'react'
import PlaygroundClientPage from './page.client'

const PlaygroundPage = () => {
  const dev = process.env.NODE_ENV === 'development'

  if (!dev) {
    notFound()
  }

  return (
    <PlaygroundClientPage />
  )
}

export default PlaygroundPage