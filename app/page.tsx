import Feature from '@/components/home/Feature'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Feature
        title='No Data Collection'
        description='Quizpot instances are built to not collect any data'
        img='/img/logo_light.png'
      />
      <Feature
        title='File Quiz Management'
        description='All Quizpot needs is the .qp file and the instance handles the rest'
        img='/img/logo_light.png'
      />
      <Feature
        title='Simple Editing Experience'
        description='Unlocking full potential of your quizzes with a simple and free editor'
        img='/img/logo_light.png'
      />
      <Feature
        title='Limitless Hosting'
        description='Host quizzes whenever and wherever you want, giving you the freedom to play quizzes even in an apocalypse'
        img='/img/logo_light.png'
      />
      <Footer />
    </>
  )

  return (
    <>
      <section>
        <Link href="/editor" className='p-4'>
          Editor
        </Link>
        <Link href="/host" className='p-4'>
          Host
        </Link>
        <Link href="/quiz" className='p-4'>
          Quiz
        </Link>
        <Link href="/stats" className='p-4'>
          Stats
        </Link>
      </section>
    </>
  )
}

export default HomePage