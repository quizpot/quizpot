import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import AddSlideButton from './AddSlideButton'
import { useTranslations } from 'next-intl'

const NewSlideDialog = () => {
  const t = useTranslations('NewSlideDialog')

  return (
    <Dialog>
      <DialogTrigger>
        { t('button') }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={ t('title') } />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <AddSlideButton slideType='title' />
            <AddSlideButton slideType='titleImageText' />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default NewSlideDialog