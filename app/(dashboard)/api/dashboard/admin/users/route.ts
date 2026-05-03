import { db } from '@/db'
import { user } from '@quizpot/quizcore/db/schema'
import { count, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await req.headers
  })

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' },
      { status: 403 }
    )
  }

  const { searchParams } = req.nextUrl
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = parseInt(searchParams.get('perPage') || '10', 10)

  const skip = (page - 1) * perPage

  try {
    const users = await db.query.user.findMany({
      limit: perPage,
      offset: skip,
      columns: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: [desc(user.createdAt)],
    })

    const [countResult] = await db.select({ value: count() }).from(user)
    const totalCount = countResult.value

    return NextResponse.json({
      users,
      pagination: {
        page,
        perPage,
        totalCount,
        totalPages: Math.ceil(totalCount / perPage),
      },
    })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
