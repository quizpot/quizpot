"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth-client'
import { signInSchema } from '@/lib/zod'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const SignInPage = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const obj = Object.fromEntries(formData.entries())
    const validation = signInSchema.safeParse(obj)

    if (!validation.success) {
      toast("Invalid credentials")
      return
    }

    const { email, password } = validation.data

    setLoading(true)
    const { error } = await authClient.signIn.email({ email, password })
    setLoading(false)

    if (error) {
      toast("Error signing in")
      return
    }

    redirect('/dashboard')
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="user@example.com" required disabled={loading} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password" required disabled={loading} />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading} asChild>
            <Link href="/auth/signup/">Create an account</Link>
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage