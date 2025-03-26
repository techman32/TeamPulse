import { notFound } from 'next/navigation'
import Profile from '@/entities/profile/ui'

interface UserPageProps {
  params: Promise<{ id: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params

  if (!id) {
    notFound()
  }

  return <Profile id={id} />
}
