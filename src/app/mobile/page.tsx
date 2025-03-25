'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MobilePage() {
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false)
        router.push('/dashboard')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [router])

  if (!isMobile) return null

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-2xl font-bold">Доступ запрещен</h1>
      <p className="text-lg mt-2">Приложение доступно только на ПК</p>
    </div>
  )
}
