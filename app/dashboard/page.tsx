'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"
import Dashboard from './dashboard-component'

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin')
    },
  })

  if (status === "loading") {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return <Dashboard session={session} />
}
