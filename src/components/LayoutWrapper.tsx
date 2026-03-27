'use client'

'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Header'
import Footer from './Footer'
import Preloader from './Preloader'
import { useState } from 'react'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (isStudio) {
    return <main className="h-screen w-full">{children}</main>
  }

  return (
    <>
      <Preloader />
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
      <main className={`flex-grow w-full ${isCollapsed ? 'md:pl-24' : 'md:pl-72'} md:pt-0 pt-16 min-h-screen relative z-10 transition-all duration-300 ease-in-out`}>
        {children}
        <Footer />
      </main>
    </>
  )
}
