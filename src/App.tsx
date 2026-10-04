import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { navigationItems as initialNavItems } from './data/mock/dashboard'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { EmpregoPage } from './pages/Emprego/EmpregoPage'

export function App() {
  const [activePage, setActivePage] = useState<string>('inicio')
  const [searchTerm, setSearchTerm] = useState('')

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
      navigationItems={updatedNavItems}
      onSelectPage={setActivePage}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      {activePage === 'inicio' && (
        <DashboardPage
          searchTerm={searchTerm}
          filterValues={{} as Parameters<typeof DashboardPage>[0]['filterValues']}
          onFilterChange={() => {}}
          onResetFilters={() => {}}
        />
      )}
      {activePage === 'emprego' && <EmpregoPage />}
    </AppShell>
  )
}

export default App