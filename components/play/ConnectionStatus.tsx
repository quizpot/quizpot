"use client"
import React from 'react'
import { useWebSocket } from '../ws/WebSocket'
import { FaArrowRotateRight } from 'react-icons/fa6'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'

const ConnectionStatus = () => {
  const { readyState } = useWebSocket()

  switch (readyState) {
    case WebSocket.CONNECTING:
      return (
        <div className='absolute z-40 top-4 right-4 p-2 bg-neutral-500 rounded-full text-white'>
          <FaArrowRotateRight className='animate-spin' />
        </div>
      )
    case WebSocket.OPEN:
      return (
        <div className='absolute z-40 top-4 right-4 p-2 bg-green-500 rounded-full text-white'>
          <FaHeart className='animate-pulse' />
        </div>
      )
    case WebSocket.CLOSED:
      return (
        <div className='absolute z-40 top-4 right-4 p-2 bg-red-500 rounded-full text-white'>
          <FaHeartBroken />
        </div>
      )
  }
}

export default ConnectionStatus