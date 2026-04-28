import { redirect } from 'next/navigation'
import PlayPageClient from './page.client'

const PlayPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) => {
  const { code } = await searchParams

  if (!code) {
    redirect('/')
  }

  return <PlayPageClient code={ code } />
}

export default PlayPage