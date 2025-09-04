import React, { useEffect } from 'react'

const Timer = ({ from }: { from: number }) => {
  const [time, setTime] = React.useState(from)

  useEffect(() => {
    if (from <= 0) {
      return
    }
    
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime - 1 <= 0) {
          clearInterval(interval)
        }
        
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [from])


  return (
    <div className='p-4 rounded-full bg-white text-black font-semibold text-4xl'>
      { time }
    </div>
  )
}

export default Timer