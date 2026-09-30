import { RotateCcw, SlidersHorizontal } from 'lucide-react'

import type { FilterGroup, FilterState } from '../../types/dashboard'
import { SelectField } from '../ui/SelectField'

interface FilterPanelProps {
  filters: FilterGroup[]
  values: FilterState
  onFilterChange: (filterId: string, value: string) => void
  onResetFilters: () => void
}

export function FilterPanel({ filters, values, onFilterChange, onResetFilters }: FilterPanelProps) {
  const activeFilterCount = filters.filter(
    (filter) => values[filter.id] !== filter.defaultValue,
  ).length

  return (
    <section className="panel p-5 lg:p-6">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            Filtros visuais
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">Recortes do dashboard</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-900">
            <SlidersHorizontal className="h-4 w-4" />
            {activeFilterCount > 0
              ? `${activeFilterCount} filtro${activeFilterCount === 1 ? '' : 's'} aplicado${activeFilterCount === 1 ? '' : 's'}`
              : 'Todos os recortes'}
          </span>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-100 hover:text-brand-900"
              title="Limpar filtros"
            >
              <RotateCcw className="h-4 w-4" />
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {filters.map((filter) => (
          <SelectField
            key={filter.id}
            id={filter.id}
            label={filter.label}
            value={values[filter.id] ?? filter.defaultValue}
            options={filter.options}
            onChange={(value) => onFilterChange(filter.id, value)}
          />
        ))}
      </div>
    </section>
  )
}