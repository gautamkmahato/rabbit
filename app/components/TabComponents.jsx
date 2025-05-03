'use client'

import { createContext, useContext, useState } from "react"

const TabsContext = createContext()

export function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}


export function TabsList({ children, className }) {
    return <div className={`flex ${className}`}>{children}</div>
}


export function TabsTrigger({ value, children, className }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-1.5 text-sm font-medium rounded-md cursor-pointer transition-colors ${
        isActive
          ? "border-primary text-neutral-600 font-semibold bg-white "
          : "border-transparent text-neutral-500 font-semibold hover:text-neutral-800"
      } ${className}`}
    >
      {children}
    </button>
  )
}


export function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext)

  return activeTab === value ? (
    <div className={className}>{children}</div>
  ) : null
}

  