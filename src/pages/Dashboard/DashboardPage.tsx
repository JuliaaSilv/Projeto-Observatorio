import { AlertCircle, SearchX } from 'lucide-react'

import { FilterPanel } from '../../components/dashboard/FilterPanel'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { TrendChart } from '../../components/dashboard/TrendChart'
import {
  dashboardFilters,
  dashboardHero,
  getDashboardMetrics,
  getDashboardTrend,
} from '../../data/mock/dashboard'
import type { FilterState } from '../../types/dashboard'

interface DashboardPageProps {
  searchTerm: string
  filterValues: FilterState
  onFilterChange: (filterId: string, value: string) => void
  onResetFilters: () => void
}

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function DashboardPage({
  searchTerm,
  filterValues,
  onFilterChange,
  onResetFilters,
}: DashboardPageProps) {
  const dashboardMetrics = getDashboardMetrics(filterValues)
  const dashboardTrend = getDashboardTrend(filterValues)
  const normalizedSearchTerm = normalizeText(searchTerm.trim())
  const filteredMetrics = dashboardMetrics.filter((metric) =>
    normalizeText(`${metric.title} ${metric.value} ${metric.variation}`).includes(
      normalizedSearchTerm,
    ),
  )

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      <section className="panel overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div>
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Dashboard inicial
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 lg:text-5xl">
              {dashboardHero.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {dashboardHero.description}
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{dashboardHero.note}</p>
        </div>
      </div>

      <FilterPanel
        filters={dashboardFilters}
        values={filterValues}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
      />

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4" aria-live="polite">
        {filteredMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
        {filteredMetrics.length === 0 && (
          <div className="panel col-span-full flex flex-col items-center justify-center px-6 py-12 text-center">
            <SearchX className="h-10 w-10 text-slate-300" />
            <h3 className="mt-4 text-lg font-extrabold text-slate-900">Nenhum indicador encontrado</h3>
            <p className="mt-2 text-sm text-slate-500">
              Tente buscar por população, desemprego, renda ou empregos formais.
            </p>
          </div>
        )}
      </section>

      <TrendChart data={dashboardTrend} selectedPeriod={filterValues.periodo} />
    </div>
  )
}