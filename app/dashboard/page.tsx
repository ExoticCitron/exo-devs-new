'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
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

  return <DashboardComponent session={session} />
}
