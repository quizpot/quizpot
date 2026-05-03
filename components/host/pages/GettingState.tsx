"use client"
import { useEffect } from 'react'
import LoadingPage from '../../ui/loading-page'

const GettingState = () => {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.reload()
    }, 2000)

    return () => {
      clearTimeout(t)
    }
  }, [])

  return <LoadingPage message="Getting lobby state ..." />
}

export default GettingState