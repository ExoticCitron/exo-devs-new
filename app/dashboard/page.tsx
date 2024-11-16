'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from 'next/dynamic'

const DashboardComponent = dynamic(() => import('./dashboard-component'), {
  ssr: false,
  loading: () => (
    <div className="p-8">
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),
})

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return session ? <DashboardComponent session={session} /> : <div>Redirecting...</div>
}
