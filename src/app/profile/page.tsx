import Profile from '@/entities/profile/ui'
import { cookies } from 'next/headers'

export async function getServerCookies() {
  const cookieStore = await cookies()
  return cookieStore.get('user_role')?.value
}

export default async function ProfilePage() {
  const role = await getServerCookies()
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <Profile role={role} />
    </div>
  )
}
