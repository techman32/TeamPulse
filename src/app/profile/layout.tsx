import { ReactNode } from 'react'
import Logo from '@/entities/logo/ui'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <Logo />
      <div className="flex">
        <div className="pt-[61px] h-screen overflow-auto w-full">{children}</div>
      </div>
    </div>
  )
}
