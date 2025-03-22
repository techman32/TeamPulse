import React from 'react'

interface Tab {
  key: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (key: string) => void
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex justify-around bg-gray-200 rounded-md p-2 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`w-full px-2 py-1 rounded-md transition hover:cursor-pointer ${
            activeTab === tab.key ? 'bg-white font-bold' : 'hover:bg-white'
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
