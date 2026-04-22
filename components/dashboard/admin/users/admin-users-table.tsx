'use client'
import React from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FancyCard from '@/components/ui/fancy-card'
import FancyButton from '@/components/ui/fancy-button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import TextInput from '@/components/ui/text-input'
import InputLabel from '@/components/ui/input-label'

interface User {
  id: string
  name: string | null
  email: string | null
  role: string | null
}

interface AdminUsersTableProps {
  users: User[]
  currentPage: number
  totalPages: number
}

const AdminUsersTable = ({ users, currentPage, totalPages }: AdminUsersTableProps) => {
  return (
    <FancyCard className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-zinc-500">Manage and view all registered users.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-zinc-200">
            <TableHead className="text-zinc-500 font-semibold uppercase text-xs">Name</TableHead>
            <TableHead className="text-zinc-500 font-semibold uppercase text-xs">Email</TableHead>
            <TableHead className="text-right text-zinc-500 font-semibold uppercase text-xs">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} className="border-zinc-100">
              <TableCell className="font-medium">{u.name || 'Anonymous'}</TableCell>
              <TableCell className="text-zinc-500">{u.email}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger size="sm">Edit</DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader title={`Edit User: ${u.name || 'Anonymous'}`} />
                    <div className="p-6 flex flex-col gap-6">
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                        <div className="flex flex-col gap-2">
                          <InputLabel label="Username" />
                          <TextInput placeholder="Enter username" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <InputLabel label="Email" />
                          <TextInput disabled value={u.email || ''} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <InputLabel label="Role" />
                          <TextInput placeholder="User role" />
                        </div>
                      </div>
                      <FancyButton color="green">Update User</FancyButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-2">
        <div className="text-xs font-medium text-zinc-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <FancyButton size="sm" asChild className={currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}>
            <Link href={`?page=${Math.max(1, currentPage - 1)}`} prefetch={false}>
              Prev
            </Link>
          </FancyButton>
          <FancyButton
            size="sm"
            asChild
            className={currentPage >= totalPages ? 'opacity-50 pointer-events-none' : ''}
          >
            <Link href={`?page=${Math.min(totalPages, currentPage + 1)}`} prefetch={false}>
              Next
            </Link>
          </FancyButton>
        </div>
      </div>
    </FancyCard>
  )
}

export default AdminUsersTable