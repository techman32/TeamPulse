'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bolt, House, Notebook, PlusCircle, Users } from 'lucide-react'

const menuItems = [
  { href: '/dashboard', icon: <House size={24} />, label: 'Главная' },
  { href: '/dashboard/tests', icon: <Notebook size={24} />, label: 'Тесты' },
  { href: '/dashboard/users', icon: <Users size={24} />, label: 'Пользователи' },
  { href: '/dashboard/management', icon: <Bolt size={24} />, label: 'Управление' },
  { href: '/dashboard/tests/create', icon: <PlusCircle size={24} />, label: 'Создать тест' },
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLabels, setShowLabels] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setShowLabels(true), 200)
      return () => clearTimeout(timer)
    } else {
      setShowLabels(false)
    }
  }, [isExpanded])

  return (
    <motion.div
      className="fixed top-[61px] left-0 h-[calc(100vh-61px)] border-r border-gray-200 shadow-xs bg-white z-50 overflow-hidden"
      animate={{ width: isExpanded ? 200 : 56 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col p-2">
        {menuItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 py-4 px-1.5 hover:bg-gray-100 rounded-md"
          >
            {icon}
            {showLabels && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                {label}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  )
}
