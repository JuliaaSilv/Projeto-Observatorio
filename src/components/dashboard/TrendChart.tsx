import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'

import type { DashboardTrendPoint } from '../../types/dashboard'

interface TrendChartProps {
  data: DashboardTrendPoint[]
  selectedPeriod: string
}

type TrendSeriesKey = 'employment' | 'unemployment' | 'income'
type ChartViewMode = 'values' | 'index'

interface TrendSeries {
  key: TrendSeriesKey
  label: string
  color: string
  yAxisId: 'values' | 'percentage'
}

const trendSeries: TrendSeries[] = [
  { key: 'employment', label: 'População ocupada', color: '#124d99', yAxisId: 'values' },
  { key: 'unemployment', label: 'Taxa de desemprego', color: '#dc2626', yAxisId: 'percentage' },
  { key: 'income', label: 'Renda média', color: '#15803d', yAxisId: 'values' },
]

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function TrendTooltip({
  active,
  payload,
  label,
  viewMode,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string; value?: number }>
  label?: string
  viewMode: ChartViewMode
}) {
  if (!active || !payload?.length) {
    return null
  }

  const labels: Record<string, string> = {
    employment: 'População ocupada',
    unemployment: 'Taxa de desemprego',
    income: 'Renda média',
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        {payload.map((entry) => (
          <p key={entry.dataKey} className="flex items-center justify-between gap-5 text-slate-600">
            <span>{labels[entry.dataKey ?? '']}</span>
            <strong className="text-slate-900">
              {viewMode === 'index'
                ? `${entry.value?.toFixed(0)} índice`
                : entry.dataKey === 'unemployment'
                ? `${entry.value?.toFixed(1).replace('.', ',')}%`
                : entry.dataKey === 'income'
                  ? formatCurrency(entry.value ?? 0)
                  : `${entry.value?.toLocaleString('pt-BR')} mil`}
            </strong>
          </p>
        ))}
      </div>
    </div>
  )
}

export function TrendChart({ data, selectedPeriod }: TrendChartProps) {
  const [visibleSeries, setVisibleSeries] = useState<Record<TrendSeriesKey, boolean>>({
    employment: true,
    unemployment: true,
    income: true,
  })
  const [viewMode, setViewMode] = useState<ChartViewMode>('values')
  const [selectedChartYear, setSelectedChartYear] = useState('all')

  const chartSourceData =
    selectedChartYear === 'all'
      ? data
      : data.filter((point) => point.period === selectedChartYear)

  const chartData =
    viewMode === 'values'
      ? chartSourceData
      : chartSourceData.map((point) => {
          const basePoint = data[0]

          return {
            ...point,
            employment: (point.employment / basePoint.employment) * 100,
            unemployment: (point.unemployment / basePoint.unemployment) * 100,
            income: (point.income / basePoint.income) * 100,
          }
        })

  const toggleSeries = (seriesKey: TrendSeriesKey) => {
    const visibleCount = Object.values(visibleSeries).filter(Boolean).length

    if (visibleSeries[seriesKey] && visibleCount === 1) {
      return
    }

    setVisibleSeries((currentSeries) => ({
      ...currentSeries,
      [seriesKey]: !currentSeries[seriesKey],
    }))
  }

  return (
    <section className="panel p-5 lg:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            Evolução temporal
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-900">Emprego, desemprego e renda</h2>
          <p className="mt-2 text-sm text-slate-500">Evolução simulada entre 2022 e 2026.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex items-center">
            <span className="sr-only">Período do gráfico</span>
            <select
              value={selectedChartYear}
              onChange={(event) => setSelectedChartYear(event.target.value)}
              className="h-10 appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            >
              <option value="all">Seleção de todos os anos</option>
              {data.map((point) => (
                <option key={point.period} value={point.period}>
                  {point.period}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
          </label>
          <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
            {(['values', 'index'] as ChartViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={[
                  'rounded-xl px-3 py-2 text-xs font-semibold transition',
                  viewMode === mode ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-500 hover:text-slate-700',
                ].join(' ')}
                aria-pressed={viewMode === mode}
              >
                {mode === 'values' ? 'Valores' : 'Índice base 100'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Séries exibidas no gráfico">
        {trendSeries.map((series) => {
          const isVisible = visibleSeries[series.key]

          return (
            <button
              key={series.key}
              type="button"
              onClick={() => toggleSeries(series.key)}
              className={[
                'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition',
                isVisible
                  ? 'border-slate-200 bg-white text-slate-700 shadow-sm'
                  : 'border-slate-200 bg-slate-50 text-slate-400',
              ].join(' ')}
              aria-pressed={isVisible}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series.color }} />
              {series.label}
              {isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
          )
        })}
      </div>

      <div className="mt-6 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 4 }}>
            <CartesianGrid stroke="#e7edf4" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis
              yAxisId="values"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={viewMode === 'index' ? (value: number) => `${value}` : undefined}
            />
            {viewMode === 'values' && (
              <YAxis
                yAxisId="percentage"
                orientation="right"
                domain={[0, 20]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value: number) => `${value}%`}
              />
            )}
            <ReferenceLine x={selectedPeriod} stroke="#1d6fdc" strokeDasharray="5 5" label={{ value: 'Período selecionado', position: 'insideTop', fill: '#124d99', fontSize: 11 }} />
            <Tooltip content={<TrendTooltip viewMode={viewMode} />} />
            {trendSeries.map((series) => (
              <Line
                key={series.key}
                hide={!visibleSeries[series.key]}
                yAxisId={viewMode === 'index' ? 'values' : series.yAxisId}
                type="monotone"
                dataKey={series.key}
                name={series.label}
                stroke={series.color}
                strokeWidth={3}
                dot={{ r: 4, fill: series.color }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}