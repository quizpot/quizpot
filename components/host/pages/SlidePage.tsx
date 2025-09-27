import { HostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import React from 'react'
import InvalidPage from './InvalidPage'
import TitleSlide from '../slides/TitleSlide'
import SkipSlide from '../slides/SkipSlide'
import TitleImageTextSlide from '../slides/TitleImageTextSlide'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'

const SlidePage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  if (hostLobbyState.currentQuestion?.questionType !== 'slide') 
    return <InvalidPage hostLobbyState={ hostLobbyState } message='Invalid question type for slide page.' />

  const slide = hostLobbyState.currentQuestion

  if (slide.layout.slideType === 'title') {
    return (
      <section 
        className='max-h-screen h-screen w-full'
        style={ getBackgroundStyles(hostLobbyState.theme.background) }
      >
        <TitleSlide slide={ slide.layout } />
        <SkipSlide />
      </section>
    )
  }

  if (slide.layout.slideType === 'titleImageText') {
    return (
      <section 
        className='max-h-screen h-screen w-full'
        style={ getBackgroundStyles(hostLobbyState.theme.background) }
      >
        <TitleImageTextSlide slide={ slide.layout } />
        <SkipSlide />
      </section>
    )
  }

  return (
    <>
      <InvalidPage hostLobbyState={ hostLobbyState } message='Unsupported slide type. Press Space to skip.' />
      <SkipSlide />
    </>
  )
}

export default SlidePage