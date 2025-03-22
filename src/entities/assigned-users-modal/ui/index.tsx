'use client'
import { useEffect, useState } from 'react'
import Button from '@/shared/ui/button'
import { getTestUsers } from '@/shared/api'

export default function AssignedUsersModal({
  templateId,
  isOpen,
  onCloseAction,
}: {
  templateId: string
  isOpen: boolean
  onCloseAction: () => void
}) {
  const [users, setUsers] = useState<
    {
      fullName: { firstName: string; lastName: string }
      id: string
      completionStatus: string
      login: string
    }[]
  >([])
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseAction()
      }
    }

    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onCloseAction])

  useEffect(() => {
    const fetchUsers = async () => {
      const { users } = await getTestUsers(templateId)
      if (users) {
        setUsers(users)
      }
    }
    fetchUsers()
  }, [templateId])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/5 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all scale-100 relative">
        <h2 className="text-lg font-semibold mb-4">Назначенные пользователи</h2>
        {users.map((user) => (
          <div key={user.id} className="flex justify-between">
            <p>
              {user.fullName.firstName} {user.fullName.lastName}
            </p>
            <p className="italic opacity-40">{user.completionStatus}</p>
          </div>
        ))}
        <div className="mt-6 flex justify-end">
          <Button text="Закрыть" onClick={onCloseAction} />
        </div>
      </div>
    </div>
  )
}
