import { useState } from 'react'
import { AlertCircle } from 'lucide-react'

import { FilterPanel } from '../../components/dashboard/FilterPanel'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { EmploymentChart } from '../../components/dashboard/EmploymentChart'

import { dashboardFilters } from '../../data/mock/dashboard'
import { empregoHero, empregoMetrics, empregoGraficoMensal } from '../../data/mock/emprego'
import type { FilterState } from '../../types/dashboard'

const initialFilterState = dashboardFilters.reduce<FilterState>((accumulator, filter) => {
  accumulator[filter.id] = filter.defaultValue
  return accumulator
}, {})

export function EmpregoPage() {
  const [filterValues, setFilterValues] = useState<FilterState>(initialFilterState)

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((currentValues) => ({
      ...currentValues,
      [filterId]: value,
    }))
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {/* Banner Principal */}
      <section className="panel overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Panorama de Emprego
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 lg:text-5xl">
              {empregoHero.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {empregoHero.description}
            </p>
          </div>

          <div className="panel-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Escopo desta página</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>Métricas focadas no mercado de trabalho formal e informal por território.</p>
              <p>Permite visualizar a dinâmica de contratados e desligados por setor produtivo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta demonstrativo */}
      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{empregoHero.note}</p>
        </div>
      </div>

      {/* Filtros */}
      <FilterPanel
        filters={dashboardFilters}
        values={filterValues}
        onFilterChange={handleFilterChange}
        onResetFilters={() => setFilterValues(initialFilterState)}
      />

      {/* Cards de Métricas de Emprego */}
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {empregoMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      {/* Gráfico de Emprego (CAGED) */}
      <section>
        <EmploymentChart data={empregoGraficoMensal} />
      </section>
    </div>
  )
}