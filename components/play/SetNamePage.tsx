import React from 'react'
import TextInput from '../ui/TextInput'
import Button from '../ui/Button'

const SetNamePage = ({ queryCode }: { queryCode?: number }) => {
  const [username, setUsername] = React.useState<string>('')

  const onClick = () => {
    sessionStorage.setItem('name', username)

    if (queryCode) {
      window.location.href = `/play?code=${ queryCode }`
    } else {
      window.location.href = '/play'
    }
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Set Your Name</h1>
      <div className='max-w-md'>
        <TextInput onChange={(e) => {
          const value = e.target.value
          setUsername(value)
        }} value={ username } />
      </div>
      <Button onClick={ onClick } variant='green' >
        Continue
      </Button>
    </section>
  )
}

export default SetNamePage