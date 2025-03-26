'use client'
import { useEffect, useState } from 'react'
import { getSubjectStats } from '@/shared/api'
import GraphStats from '@/entities/graph-stats/ui' // Импортируем компонент для графиков

export default function SubjectStats({ id }: { id: string }) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getSubjectStats(id)
        setData(response.data)
      } catch (error) {
        console.error('Ошибка при загрузке данных', error)
      }
    }
    fetchStats()
  }, [id])

  if (!data) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      <h2>Статистика по предмету</h2>
      <GraphStats data={data} />
    </div>
  )
}
