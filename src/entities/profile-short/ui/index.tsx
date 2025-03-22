import { User } from '@/shared/lib/types'
import Input from '@/shared/ui/input'

export default function ProfileShort({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Email</h2>
        <Input value={user.email} readOnly />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Имя пользователя</h2>
        <Input value={user.login} readOnly />
      </div>
      {user.groups.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Список групп</h2>
          <div className="flex flex-wrap gap-2">
            {user.groups.map((group, index) => (
              <p key={index} className="bg-gray-100 px-4 py-1 rounded-full">
                {typeof group === 'string' ? group : group.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
