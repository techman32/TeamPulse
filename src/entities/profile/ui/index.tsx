'use client'
import { useEffect, useState } from 'react'
import { getUser } from '@/shared/api'
import { User } from '@/shared/lib/types'
import Tabs from '@/entities/tabs/ui'
import ProfileShort from '@/entities/profile-short/ui'
import AssignedTestsList from '@/entities/assigned-tests-list/ui'
import UserTests from '@/entities/user-tests/ui'
import UserStatistic from '@/entities/user-statistic'
import SubjectStats from '@/entities/subject-stats/ui'

export default function Profile({ id, role }: { id?: string; role?: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'tests'>('profile')

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getUser(id || '')
      if (user) setUser(user)
    }

    fetchUser()
  }, [id])

  const tabs = [
    { key: 'profile', label: 'Профиль' },
    { key: 'stats', label: 'Статистика' },
    { key: 'tests', label: 'Назначенные тесты' },
  ]

  return (
    <>
      {user ? (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">
            {user.fullName.lastName} {user.fullName.firstName}
          </h1>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(e) => setActiveTab(e as 'profile' | 'stats' | 'tests')}
          />
          <div className="mt-4">
            {activeTab === 'profile' && <ProfileShort user={user} />}
            {activeTab === 'stats' && id && <SubjectStats id={id} />}
            {activeTab === 'tests' && (role === 'employee' ? <AssignedTestsList /> : id && <UserTests userId={id} />)}
          </div>
        </div>
      ) : (
        <p className="italic">Загрузка...</p>
      )}
    </>
  )
}
