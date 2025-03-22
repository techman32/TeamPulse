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

  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <Profile id={id} />
    </div>
  )
}
