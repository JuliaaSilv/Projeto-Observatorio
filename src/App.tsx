import { useState } from 'react'

import { AppShell } from './components/layout/AppShell'
import {
  dashboardFilters,
  getDashboardFilterSummary,
} from './data/mock/dashboard'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import type { FilterState } from './types/dashboard'

const initialFilterState = dashboardFilters.reduce<FilterState>((accumulator, filter) => {
  accumulator[filter.id] = filter.defaultValue
  return accumulator
}, {})

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValues, setFilterValues] = useState<FilterState>(initialFilterState)

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((currentValues) => ({
      ...currentValues,
      [filterId]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilterValues(initialFilterState)
  }

  return (
    <AppShell
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterSummary={getDashboardFilterSummary(filterValues)}
    >
      <DashboardPage
        searchTerm={searchTerm}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
    </AppShell>
  )
}

export default App
