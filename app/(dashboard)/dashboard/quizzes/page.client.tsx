'use client'

import FancyButton from '@/components/ui/fancy-button'
import TextInput from '@/components/ui/text-input'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { QuizCard } from '@/components/dashboard/quizzes/quiz-card'
import { InferSelectModel } from 'drizzle-orm'
import { quiz } from '@quizpot/quizcore/db/schema'
import FancyCard from '@/components/ui/fancy-card'

type Quiz = InferSelectModel<typeof quiz>

const QuizzesPageClient = ({
  initialQuizzes
}: {
  initialQuizzes: Quiz[]
}) => {
  const t = useTranslations('QuizzesPage')
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialQuizzes.length >= 9)
  
  const isFirstRender = useRef(true)

  const fetchQuizzes = useCallback(async (query: string, pageNum: number, append: boolean) => {
    setLoading(true);
    const limit = 9;
    
    try {
      const res = await fetch('/api/dashboard/quizzes/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, page: pageNum, limit }),
      });

      if (!res.ok) throw new Error('Search failed');

      const data: Quiz[] = await res.json();

      setHasMore(data.length === limit);
      setQuizzes((prev) => (append ? [...prev, ...data] : data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setPage(1);
      fetchQuizzes(searchQuery, 1, false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchQuizzes]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchQuizzes(searchQuery, nextPage, true);
  };

  const onDeleteSuccess = useCallback((id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  }, []);

  return (
    <>
      <FancyButton color='green' className='text-center' asChild>
        <Link href={'/editor'}>{ t('createNew') }</Link>
      </FancyButton>
      
      <TextInput 
        placeholder={ t('search') } 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />

      {quizzes.length === 0 && !loading ? (
        <FancyCard className="mt-6">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-gray-500 font-medium">
              {searchQuery ? `${t('notFoundFor')} "${searchQuery}"` : t('noneFound')}
            </p>
          </div>
        </FancyCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {quizzes.map((q) => (
            <QuizCard 
              key={q.id} 
              quiz={q} 
              onDeleteSuccess={onDeleteSuccess} 
            />
          ))}
        </div>
      )}
 
      {quizzes.length > 0 && hasMore && (
        <div className="flex justify-center mt-8">
          <FancyButton onClick={loadMore} disabled={loading}>
            {loading ? t('loading') : t('loadMore')}
          </FancyButton>
        </div>
      )}
    </>
  )
}

export default QuizzesPageClient