import React from 'react'

const Notification = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full p-2 text-center text-sm bg-yellow-500/40 text-yellow-950'>
      { children }
    </section>
  )
}

export default Notification