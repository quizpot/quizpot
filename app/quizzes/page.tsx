"use client"
import QuizCard from '@/components/quizzes/QuizCard'
import DeviceScreenUnsupported from '@/components/ui/unsupported-device-overlay'
import { useToast } from '@/components/ui/toaster'
import { getAllQuizzes } from '@/lib/client/IndexedDB'
import { QuizFile } from '@/lib/QuizFile'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'
import Header from '@/components/nav/Header'
import Footer from '@/components/nav/Footer'
import TextInput from '@/components/ui/TextInput'
import NewQuizDialog from '@/components/quizzes/NewQuizDialog'

const QuizzesPage = () => {
  const t = useTranslations('QuizzesPage')
  const btn = useTranslations('Buttons')
  const toast = useToast()
  
  const [query, setQuery] = React.useState('')
  const [quizzes, setQuizzes] = React.useState<QuizFile[]>([])
  const [sortOrder, setSortOrder] = React.useState<'latest' | 'oldest' | 'biggest' | 'smallest'>('latest')

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const loadedQuizzesArray = await getAllQuizzes()

        loadedQuizzesArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        setQuizzes(loadedQuizzesArray)
      } catch (error) {
        toast('Error loading quizzes', { variant: 'error' })
        console.error('Error loading quizzes:', error)
      }
    }
    
    loadQuizzes()
  }, [toast]) 

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const filteredQuizzes = [...quizzes]
    .filter((quiz) => {
      const searchTerm = query.toLowerCase()
      const date = new Date(quiz.createdAt)

      const monthLong = date.toLocaleString('default', { month: 'long' }).toLowerCase()
      const monthShort = date.toLocaleString('default', { month: 'short' }).toLowerCase()
      const fullDateString = date.toLocaleDateString().toLowerCase()
      
      const searchableContent = [
        quiz.title,
        quiz.description,
        quiz.version,
        quiz.language,
        monthLong,
        monthShort,
        fullDateString
      ].join(' ').toLowerCase()

      return searchableContent.includes(searchTerm)
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'biggest':
          return (b.questions?.length || 0) - (a.questions?.length || 0)
        case 'smallest':
          return (a.questions?.length || 0) - (b.questions?.length || 0)
        default:
          return 0
      }
    })

  return (
    <>
      <DeviceScreenUnsupported />
      <Header />
      <section className='container mx-auto w-full mt-32 flex flex-col gap-4 p-4'>
        <h1 className='text-2xl lg:text-4xl font-bold text-center p-4 py-16'>{ t('title') }</h1>
        <div className='w-full mx-auto text-center flex flex-col gap-4'>
          <NewQuizDialog />
          <div className='grid grid-cols-8 gap-4'>
            <TextInput 
              value={query} 
              onChange={onSearch} 
              placeholder={t('search')} 
              className={'col-span-4 w-full text-center ' + (query ? '' : 'opacity-50')}
            />
            <FancyButton 
              onClick={() => setSortOrder('latest')}
              className={sortOrder !== 'latest' ? 'opacity-50' : ''}
            >
              {t('latest')}
            </FancyButton>
            <FancyButton 
              onClick={() => setSortOrder('oldest')}
              className={sortOrder !== 'oldest' ? 'opacity-50' : ''}
            >
              {t('oldest')}
            </FancyButton>
            <FancyButton 
              onClick={() => setSortOrder('biggest')}
              className={sortOrder !== 'biggest' ? 'opacity-50' : ''}
            >
              {t('biggest')}
            </FancyButton>
            <FancyButton 
              onClick={() => setSortOrder('smallest')}
              className={sortOrder !== 'smallest' ? 'opacity-50' : ''}
            >
              {t('smallest')}
            </FancyButton>
          </div>
        </div>
        <div className='container mx-auto w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} id={quiz.id} />
            ))
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-20 gap-4'>
              <p className='text-xl font-medium'>
                {query ? t('notFoundFor') + query : t('noneFound')}
              </p>
              {query && (
                <FancyButton size='sm' onClick={() => setQuery('')}>
                  { btn('clearSearch') }
                </FancyButton>
              )}
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  )
}

export default QuizzesPage