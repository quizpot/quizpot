"use client"
import { usePlayerLobbyState } from '@/components/providers/player-ls-provider'
import { useWebSocket } from '@/components/providers/ws-provider'
import FancyButton from '@/components/ui/fancy-button'
import TextInput from '@/components/ui/text-input'
import { useTranslations } from 'next-intl'
import React from 'react'

const ShortAnswerPlayerInput = () => {
  const t = useTranslations('Buttons')
  const [answer, setAnswer] = React.useState("")
  const { sendEvent } = useWebSocket()
  const { setPlayerLobbyState } = usePlayerLobbyState()

  const onSubmit = () => {
    sendEvent('SUBMIT_ANSWER', { 
      submission: {
        type: 'shortAnswer',
        answer
      }
    })

    setPlayerLobbyState(prevPlayerLobbyState => {
      if (!prevPlayerLobbyState) return null

      return {
        ...prevPlayerLobbyState,
        hasAnswered: true,
      }
    })
  }

  return (
    <>
      <TextInput onChange={ e => setAnswer(e.target.value) } value={ answer } className='w-full text-center' />
      <FancyButton onClick={ onSubmit } color='green' className='w-full text-center'>
        { t('submit') }
      </FancyButton>
    </>
  )
}

export default ShortAnswerPlayerInput