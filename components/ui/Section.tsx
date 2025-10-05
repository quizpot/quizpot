import React from 'react'

const Section = ({ children, className, outerClassName }: { children: React.ReactNode, className?: string, outerClassName?: string }) => {
  return (
    <section className={ 'w-full ' + outerClassName }>
      <div className={ 'container w-full mx-auto ' + className }>
        { children }
      </div>
    </section>
  )
}

export default Section