import type { ReactNode } from 'react'
import type { NavigationItem } from '../../types/dashboard'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppShellProps {
  children: ReactNode
  navigationItems: NavigationItem[]
  onSelectPage?: (pageId: string) => void
}

export function AppShell({ children, navigationItems, onSelectPage }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1680px] flex-col gap-4 p-4 lg:flex-row lg:gap-6 lg:p-4">
      <Sidebar items={navigationItems} onSelectPage={onSelectPage} />

      <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}