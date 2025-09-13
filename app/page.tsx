import Features from '@/components/home/Features'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import Preview from '@/components/home/Preview'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Preview />
      <Features />
      <Footer />
    </>
  )
}

export default HomePage