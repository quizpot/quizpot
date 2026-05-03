import FancyButton from './fancy-button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const MessagePage = ({ message }: { message: string }) => {
  const t = useTranslations('Buttons')

  return (
    <main className='z-50 fixed top-0 left-0 h-dvh w-full flex flex-col gap-4 items-center justify-center p-4 drop-shadow-lg text-2xl'>
      { message }
      <FancyButton asChild>
        <Link href={'/'} className='text-base'>
          {t('home')}
        </Link>
      </FancyButton>
    </main>
  )
}

export default MessagePage