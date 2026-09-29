import type { ChangeEvent } from 'react'

import { ChevronDown } from 'lucide-react'

import type { FilterOption } from '../../types/dashboard'

interface SelectFieldProps {
  id: string
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

export function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-11 text-slate-700 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  )
}