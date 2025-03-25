import { ReactNode } from 'react'
import Logo from '@/entities/logo/ui'
import Sidebar from '@/entities/sidebar/ui'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <Logo />
      <div className="flex">
        <Sidebar />
        <div className="pt-[61px] h-screen overflow-auto w-full pl-[55px]">
          <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
