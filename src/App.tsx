import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import {
  dashboardFilters,
  getDashboardFilterSummary,
  navigationItems as initialNavItems,
} from './data/mock/dashboard'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { EmpregoPage } from './pages/Emprego/EmpregoPage'
import { RendaPage } from './pages/Renda/RendaPage'
import { TerritoriosPage } from './pages/Territorios/TerritoriosPage'
import { DadosPage } from './pages/Dados/DadosPage'
import { MetodologiaPage } from './pages/Metodologia/MetodologiaPage'
import type { FilterState } from './types/dashboard'

const defaultFilterState: FilterState = dashboardFilters.reduce<FilterState>((acc, filter) => {
  acc[filter.id] = filter.defaultValue
  return acc
}, {})

export function App() {
  const [activePage, setActivePage] = useState<string>('inicio')
  const [searchTerm, setSearchTerm] = useState('')
  const [dashboardFilterValues, setDashboardFilterValues] = useState<FilterState>(defaultFilterState)

  const handleFilterChange = (filterId: string, value: string) => {
    setDashboardFilterValues((prev) => ({
      ...prev,
      [filterId]: value,
    }))
  }

  const handleResetFilters = () => {
    setDashboardFilterValues(defaultFilterState)
  }

  const updatedNavItems = initialNavItems.map((item) => ({
    ...item,
    isActive: item.id === activePage,
  }))

  return (
    <AppShell
      navigationItems={updatedNavItems}
      onSelectPage={setActivePage}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterSummary={getDashboardFilterSummary(dashboardFilterValues)}
    >
      {activePage === 'inicio' && (
        <DashboardPage
          searchTerm={searchTerm}
          filterValues={dashboardFilterValues}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      )}
      {activePage === 'emprego' && <EmpregoPage />}
      {activePage === 'renda' && <RendaPage />}
      {activePage === 'territorios' && <TerritoriosPage />}
      {activePage === 'dados' && <DadosPage />}
      {activePage === 'metodologia' && <MetodologiaPage />}
    </AppShell>
  )
}

export default App