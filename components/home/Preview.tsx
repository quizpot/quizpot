"use client"
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

const Preview = () => {
  const [index, setIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [stopped, setStopped] = React.useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (stopped) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1))
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [stopped])

  useEffect(() => {
    setProgress(0)
    if (stopped) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      return
    }
    
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
          return 100
        }
        return prevProgress + 1
      })
    }, 50)

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [index, stopped])

  useEffect(() => {
    const increment = () => setIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1))
    const decrement = () => setIndex((prevIndex) => (prevIndex === 0 ? 5 : prevIndex - 1))

    const skip = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        increment()
      }

      if (e.key === 'ArrowLeft') {
        decrement()
      }

      if (e.key === ' ') {
        e.preventDefault()
        setStopped((prevStopped) => !prevStopped)
      }
    }

    document.addEventListener('keydown', skip)

    return () => {
      document.removeEventListener('keydown', skip)
    }
  }, [])

  return (
    <section className='w-full -mt-32'>
      <div className='container mx-auto w-full p-4 mb-16'>
        <div className='relative mx-auto w-fit'>
          <Image src={'/img/preview/' + index + '.png'} alt='Preview' width={ 1280 } height={ 720 } className='rounded shadow-2xl' />
          <div className='absolute bottom-0 left-0 py-1 bg-black/50 duration-100 rounded-bl' style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </section>
  )
}

export default Preview