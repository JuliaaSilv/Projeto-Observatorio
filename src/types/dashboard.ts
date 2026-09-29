export type NavIconName =
  | 'home'
  | 'briefcase'
  | 'wallet'
  | 'map'
  | 'database'
  | 'book-open'

export interface NavigationItem {
  id: string
  label: string
  icon: NavIconName
  isActive?: boolean
  isAvailable?: boolean
}

export type MetricTrend = 'positive' | 'negative' | 'neutral'

export type MetricIconName = 'users' | 'trending-down' | 'badge-cent' | 'building-2'

export interface Metric {
  id: string
  title: string
  value: string
  variation: string
  trend: MetricTrend
  icon: MetricIconName
}

export interface FilterOption {
  label: string
  value: string
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
  defaultValue: string
}

export type FilterState = Record<string, string>

export interface DashboardHero {
  title: string
  description: string
  note: string
}