import { BadgeCent, Building2, TrendingDown, Users, type LucideIcon } from 'lucide-react'

import type { Metric, MetricIconName } from '../../types/dashboard'

const iconMap: Record<MetricIconName, LucideIcon> = {
  users: Users,
  'trending-down': TrendingDown,
  'badge-cent': BadgeCent,
  'building-2': Building2,
}

interface MetricCardProps {
  metric: Metric
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = iconMap[metric.icon]

  const trendClassName =
    metric.trend === 'positive'
      ? 'bg-success-50 text-success-600'
      : metric.trend === 'negative'
        ? 'bg-danger-50 text-danger-600'
        : 'bg-slate-100 text-slate-600'

  return (
    <article className="panel overflow-hidden p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{metric.title}</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">{metric.value}</p>
        </div>

        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white shadow-lg shadow-brand-900/15">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-500">Variação no período</span>
        <span className={[ 'rounded-full px-3 py-1 text-sm font-semibold', trendClassName ].join(' ')}>
          {metric.variation}
        </span>
      </div>
    </article>
  )
}