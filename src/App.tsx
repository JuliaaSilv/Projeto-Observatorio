import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { navigationItems as initialNavItems } from './data/mock/dashboard'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { EmpregoPage } from './pages/Emprego/EmpregoPage'

export function App() {
  const [activePage, setActivePage] = useState<string>('inicio')

  // Garante que a opção Emprego está disponível e atualiza qual está ativa
  const updatedNavItems = initialNavItems.map((item) => {
    const isEmprego = item.id === 'emprego'
    return {
      ...item,
      isAvailable: item.id === 'inicio' || isEmprego ? true : item.isAvailable,
      isActive: item.id === activePage,
    }
  })

  return (
    <AppShell
      {...({
        navigationItems: updatedNavItems,
        onSelectPage: setActivePage,
      } as any)}
    >
      {activePage === 'inicio' && <DashboardPage />}
      {activePage === 'emprego' && <EmpregoPage />}
    </AppShell>
  )
}

export default App