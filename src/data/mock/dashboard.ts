import type {
  DashboardHero,
  FilterGroup,
  FilterState,
  Metric,
  NavigationItem,
  DashboardNotification,
  DashboardTrendPoint,
} from '../../types/dashboard'

export const navigationItems: NavigationItem[] = [
  { id: 'inicio', label: 'Início', icon: 'home', isActive: true, isAvailable: true },
  { id: 'emprego', label: 'Emprego', icon: 'briefcase', isAvailable: true },
  { id: 'renda', label: 'Renda', icon: 'wallet', isAvailable: true },
  { id: 'territorios', label: 'Territórios', icon: 'map', isAvailable: true },
  { id: 'dados', label: 'Dados', icon: 'database', isAvailable: true },
  { id: 'metodologia', label: 'Metodologia', icon: 'book-open', isAvailable: true },
]

export const dashboardHero: DashboardHero = {
  title: 'Observatório de Emprego e Renda do Recife',
  description:
    'Explore indicadores sobre o mercado de trabalho e a distribuição de renda no Recife.',
  note:
    'Os dados apresentados nesta versão são demonstrativos e não representam estatísticas oficiais.',
}

export const dashboardNotifications: DashboardNotification[] = [
  {
    id: 'atualizacao-indicadores',
    title: 'Indicadores atualizados',
    description: 'Os valores demonstrativos foram recalculados para o período selecionado.',
    time: 'Agora',
    tone: 'positive',
  },
  {
    id: 'filtros-disponiveis',
    title: 'Novos recortes disponíveis',
    description: 'Você pode combinar bairro, gênero, faixa etária e setor no dashboard.',
    time: 'Há 8 min',
    tone: 'info',
  },
  {
    id: 'aviso-demonstrativo',
    title: 'Atenção aos dados',
    description: 'Esta versão utiliza dados fictícios e não representa estatísticas oficiais.',
    time: 'Há 1 h',
    tone: 'attention',
  },
]

const automatedNotificationTemplates: Omit<DashboardNotification, 'id' | 'time'>[] = [
  {
    title: 'Nova atualização demonstrativa',
    description: 'Os indicadores receberam uma nova simulação para o acompanhamento do painel.',
    tone: 'positive',
  },
  {
    title: 'Recorte pronto para consulta',
    description: 'Uma nova combinação de filtros está disponível para exploração no dashboard.',
    tone: 'info',
  },
  {
    title: 'Lembrete sobre a base',
    description: 'Os dados exibidos continuam sendo fictícios e servem apenas para demonstração.',
    tone: 'attention',
  },
]

export function createDashboardNotification(
  sequence: number,
  filterSummary: string,
): DashboardNotification {
  const template = automatedNotificationTemplates[sequence % automatedNotificationTemplates.length]

  return {
    ...template,
    id: `automated-${Date.now()}-${sequence}`,
    description: `${template.description} Recorte atual: ${filterSummary}.`,
    time: 'Agora',
  }
}

export function createFilterNotification(filterSummary: string): DashboardNotification {
  return {
    id: `filter-update-${Date.now()}`,
    title: 'Indicadores atualizados',
    description: `Os dados demonstrativos foram recalculados para ${filterSummary}.`,
    time: 'Agora',
    tone: 'positive',
  }
}

const baseDashboardMetrics: Metric[] = [
  {
    id: 'populacao-ocupada',
    title: 'População ocupada',
    value: '1.245.678',
    variation: '+2,3%',
    trend: 'positive',
    icon: 'users',
  },
  {
    id: 'taxa-desemprego',
    title: 'Taxa de desemprego',
    value: '12,4%',
    variation: '-1,2%',
    trend: 'negative',
    icon: 'trending-down',
  },
  {
    id: 'renda-media',
    title: 'Renda média do trabalho',
    value: 'R$ 2.478',
    variation: '+4,8%',
    trend: 'positive',
    icon: 'badge-cent',
  },
  {
    id: 'empregos-formais',
    title: 'Empregos formais',
    value: '812.356',
    variation: '+3,1%',
    trend: 'positive',
    icon: 'building-2',
  },
]

const filterEffects: Record<string, Record<string, number>> = {
  periodo: {
    '2024': 0,
    '2025': 0.018,
    '2026': 0.036,
    '2023': -0.018,
    '2022': -0.036,
  },
  bairro: {
    'todos-bairros': 0,
    'boa-viagem': 0.042,
    ibura: -0.062,
    varzea: -0.018,
    'casa-forte': 0.031,
    gracas: 0.048,
  },
  genero: {
    todos: 0,
    mulheres: -0.014,
    homens: 0.014,
  },
  'faixa-etaria': {
    todas: 0,
    '18-24': -0.028,
    '25-34': 0.022,
    '35-44': 0.038,
    '45+': -0.012,
  },
  setor: {
    todos: 0,
    servicos: 0.034,
    comercio: 0.012,
    industria: 0.026,
    construcao: -0.021,
    agropecuaria: -0.037,
  },
}

const metricMultipliers: Record<string, number> = {
  'populacao-ocupada': 1,
  'taxa-desemprego': -0.72,
  'renda-media': 0.82,
  'empregos-formais': 1.16,
}

const metricVariationMultipliers: Record<string, number> = {
  'populacao-ocupada': 0.45,
  'taxa-desemprego': -0.28,
  'renda-media': 0.7,
  'empregos-formais': 0.58,
}

const formatMetricValue = (metricId: string, value: number) => {
  if (metricId === 'taxa-desemprego') {
    return `${value.toFixed(1).replace('.', ',')}%`
  }

  if (metricId === 'renda-media') {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    })
  }

  return Math.round(value).toLocaleString('pt-BR')
}

const formatVariation = (value: number) => {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1).replace('.', ',')}%`
}

export function getDashboardMetrics(filters: FilterState): Metric[] {
  const adjustment = Object.entries(filters).reduce((total, [filterId, selectedValue]) => {
    return total + (filterEffects[filterId]?.[selectedValue] ?? 0)
  }, 0)

  return baseDashboardMetrics.map((metric) => {
    const baseValue = Number(metric.value.replace(/[^0-9,]/g, '').replace(',', '.'))
    const baseVariation = Number(metric.variation.replace(',', '.'))
    const adjustedValue = baseValue * (1 + adjustment * metricMultipliers[metric.id])
    const adjustedVariation = baseVariation + adjustment * 100 * metricVariationMultipliers[metric.id]

    return {
      ...metric,
      value: formatMetricValue(metric.id, adjustedValue),
      variation: formatVariation(adjustedVariation),
      trend: adjustedVariation >= 0 ? 'positive' : 'negative',
    }
  })
}

const baseDashboardTrend: DashboardTrendPoint[] = [
  { period: '2022', employment: 1120, unemployment: 14.8, income: 2180 },
  { period: '2023', employment: 1168, unemployment: 13.7, income: 2310 },
  { period: '2024', employment: 1245, unemployment: 12.4, income: 2478 },
  { period: '2025', employment: 1284, unemployment: 11.6, income: 2632 },
  { period: '2026', employment: 1322, unemployment: 10.9, income: 2796 },
]

export function getDashboardTrend(filters: FilterState): DashboardTrendPoint[] {
  const adjustment = Object.entries(filters).reduce((total, [filterId, selectedValue]) => {
    return total + (filterEffects[filterId]?.[selectedValue] ?? 0)
  }, 0)

  return baseDashboardTrend.map((point) => ({
    ...point,
    employment: Math.round(point.employment * (1 + adjustment)),
    unemployment: Number(Math.max(0, point.unemployment * (1 - adjustment * 0.72)).toFixed(1)),
    income: Math.round(point.income * (1 + adjustment * 0.82)),
  }))
}

export const dashboardFilters: FilterGroup[] = [
  {
    id: 'periodo',
    label: 'Período',
    defaultValue: '2024',
    options: [
      { label: '2026', value: '2026' },
      { label: '2025', value: '2025' },
      { label: '2024', value: '2024' },
      { label: '2023', value: '2023' },
      { label: '2022', value: '2022' },
    ],
  },
  {
    id: 'bairro',
    label: 'Bairro',
    defaultValue: 'todos-bairros',
    options: [
      { label: 'Todos os bairros', value: 'todos-bairros' },
      { label: 'Boa Viagem', value: 'boa-viagem' },
      { label: 'Ibura', value: 'ibura' },
      { label: 'Várzea', value: 'varzea' },
      { label: 'Casa Forte', value: 'casa-forte' },
      { label: 'Graças', value: 'gracas' },
    ],
  },
  {
    id: 'genero',
    label: 'Gênero',
    defaultValue: 'todos',
    options: [
      { label: 'Todos', value: 'todos' },
      { label: 'Mulheres', value: 'mulheres' },
      { label: 'Homens', value: 'homens' },
    ],
  },
  {
    id: 'faixa-etaria',
    label: 'Faixa etária',
    defaultValue: 'todas',
    options: [
      { label: 'Todas', value: 'todas' },
      { label: '18–24', value: '18-24' },
      { label: '25–34', value: '25-34' },
      { label: '35–44', value: '35-44' },
      { label: '45+', value: '45+' },
    ],
  },
  {
    id: 'setor',
    label: 'Setor',
    defaultValue: 'todos',
    options: [
      { label: 'Todos', value: 'todos' },
      { label: 'Serviços', value: 'servicos' },
      { label: 'Comércio', value: 'comercio' },
      { label: 'Indústria', value: 'industria' },
      { label: 'Construção', value: 'construcao' },
      { label: 'Agropecuária', value: 'agropecuaria' },
    ],
  },
]

export function getDashboardFilterSummary(filters: FilterState): string {
  return dashboardFilters
    .map((filter) => {
      const selectedValue = filters[filter.id] ?? filter.defaultValue
      const selectedOption = filter.options.find((option) => option.value === selectedValue)
      return `${filter.label}: ${selectedOption?.label ?? selectedValue}`
    })
    .join(' · ')
}