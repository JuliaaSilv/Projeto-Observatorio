import { SlidersHorizontal } from 'lucide-react'

import type { FilterGroup, FilterState } from '../../types/dashboard'
import { SelectField } from '../ui/SelectField'

interface FilterPanelProps {
  filters: FilterGroup[]
  values: FilterState
  onFilterChange: (filterId: string, value: string) => void
}

export function FilterPanel({ filters, values, onFilterChange }: FilterPanelProps) {
  return (
    <section className="panel p-5 lg:p-6">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            Filtros visuais
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">Recortes para exploração futura</h3>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-900">
          <SlidersHorizontal className="h-4 w-4" />
          Sem impacto nos dados nesta etapa
        </span>
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