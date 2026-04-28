"use client"
import { useEffect, useRef } from "react"

const AutoSubmit = () => {
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    formRef.current = document.querySelector('form')
    formRef.current?.requestSubmit()
  }, [])

  return null
}

export default AutoSubmit