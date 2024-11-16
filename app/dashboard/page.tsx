// pages/dashboard.js
import { getSession, useSession } from 'next-auth/react'
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

export default function DashboardPage({ session }) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px] w-full" />
        <p>Session not found. Redirecting...</p>
      </div>
    )
  }

  return <DashboardComponent session={session} />
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
