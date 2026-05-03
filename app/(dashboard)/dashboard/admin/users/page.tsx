import { db } from '@/db'
import { user } from '@quizpot/quizcore/db/schema'
import { count, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminUsersTable from '@/components/dashboard/admin/users/admin-users-table'

interface Props {
  searchParams: Promise<{ page?: string }>
}

const AdminUsersPage = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const params = await searchParams
  const perPage = 10
  const page = parseInt(params.page || '1', 10)
  const offset = (page - 1) * perPage

  const users = await db.query.user.findMany({
    limit: perPage,
    offset: offset,
    columns: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    orderBy: [desc(user.createdAt)],
  })

  const [countResult] = await db.select({ value: count() }).from(user)
  const totalCount = countResult.value
  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <div className="p-6">
      <AdminUsersTable users={users} currentPage={page} totalPages={totalPages} />
    </div>
  )
}

export default AdminUsersPage