import type {
  DashboardHero,
  FilterGroup,
  Metric,
  NavigationItem,
} from '../../types/dashboard'

export const navigationItems: NavigationItem[] = [
  { id: 'inicio', label: 'Início', icon: 'home', isActive: true, isAvailable: true },
  { id: 'emprego', label: 'Emprego', icon: 'briefcase', isAvailable: true }, // Mude para true
  { id: 'renda', label: 'Renda', icon: 'wallet', isAvailable: false },
  { id: 'territorios', label: 'Territórios', icon: 'map', isAvailable: false },
  { id: 'dados', label: 'Dados', icon: 'database', isAvailable: false },
  { id: 'metodologia', label: 'Metodologia', icon: 'book-open', isAvailable: false },
]

export const dashboardHero: DashboardHero = {
  title: 'Observatório de Emprego e Renda do Recife',
  description:
    'Explore indicadores sobre o mercado de trabalho e a distribuição de renda no Recife.',
  note:
    'Os dados apresentados nesta versão são demonstrativos e não representam estatísticas oficiais.',
}

export const dashboardMetrics: Metric[] = [
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

export const dashboardFilters: FilterGroup[] = [
  {
    id: 'periodo',
    label: 'Período',
    defaultValue: '2024',
    options: [
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