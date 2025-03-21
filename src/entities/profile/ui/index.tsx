'use client'
import { useEffect, useState } from 'react'
import { getUser } from '@/shared/api'
import { User } from '@/shared/lib/types'
import Tabs from '@/entities/tabs/ui'
import ProfileShort from '@/entities/profile-short/ui'
import AssignedTestsList from '@/entities/assigned-tests-list/ui'

export default function Profile({ id, role }: { id?: string; role?: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'tests'>('profile')

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const { user } = await getUser(id || '')
    if (user) setUser(user)
  }

  const tabs = [
    { key: 'profile', label: 'Профиль' },
    { key: 'account', label: 'Аккаунт' },
    { key: 'tests', label: 'Назначенные тесты' },
  ]

  return (
    <>
      {user && (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">
            {user.fullName.lastName} {user.fullName.firstName}
          </h1>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(e) => setActiveTab(e as 'profile' | 'account' | 'tests')}
          />
          <div className="mt-4">
            {activeTab === 'profile' && <ProfileShort user={user} />}
            {activeTab === 'account' && <p>Настройки аккаунта</p>}
            {activeTab === 'tests' && role === 'employee' && <AssignedTestsList />}
          </div>
        </div>
      )}
    </>
  )
}
