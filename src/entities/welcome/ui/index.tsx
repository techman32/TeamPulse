'use client'
import Button from '@/shared/ui/button'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Welcome() {
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({x: event.clientX, y: event.clientY})
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!isClient) return null

  const perspectiveX = (mousePosition.x / window.innerWidth - 0.5) * 10
  const perspectiveY = (mousePosition.y / window.innerHeight - 0.5) * 10
  return (
    <div
      className={'relative w-[calc(100%-60px)] flex flex-col gap-8 justify-center items-center'}
      style={{
        transform: `perspective(500px) rotateX(${perspectiveY}deg) rotateY(${perspectiveX}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <h1 className={'text-2xl md:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-center'}>
        <span>Простой способ тестирования</span><br/>
        <span>
            и развития сотрудников с <span className={'underline underline-offset-8'}>TeamPulse</span>
          </span>
      </h1>
      <p className={'text-xl md:text-xl mx-[20%] text-center'}>
        Создавайте тесты, назначайте их сотрудникам и получайте объективные результаты.
        Гибкая интеграция для удобной работы в вашей экосистеме.
      </p>
      <div className={'flex flex-col gap-2 items-center'}>
        <div className={'flex gap-4'}>
          <Button text={'Оставить заявку'}/>
        </div>
        <Link href={'/auth'}>
          <span className={'text-sm hover:underline underline-offset-4'}>Уже зарегистрированы?</span>
        </Link>
      </div>
    </div>
  )
}