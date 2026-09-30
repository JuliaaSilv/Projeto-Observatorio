import type { DashboardHero, Metric } from '../../types/dashboard'

export const empregoHero: DashboardHero = {
  title: 'Indicadores de Emprego no Recife',
  description:
    'Acompanhe a movimentação de admissões, desligamentos, saldo de vagas do CAGED e distribuição por setores econômicos.',
  note:
    'Os dados apresentados nesta versão são demonstrativos e não representam estatísticas oficiais.',
}
export const empregoGraficoMensal = [
  { mes: 'Jan', admissoes: 4200, desligamentos: 3800 },
  { mes: 'Fev', admissoes: 4500, desligamentos: 3900 },
  { mes: 'Mar', admissoes: 4800, desligamentos: 4100 },
  { mes: 'Abr', admissoes: 4100, desligamentos: 4300 },
  { mes: 'Mai', admissoes: 5200, desligamentos: 4000 },
  { mes: 'Jun', admissoes: 5600, desligamentos: 4200 },
]
export const empregoMetrics: Metric[] = [
  {
    id: 'admissoes',
    title: 'Admissões no período',
    value: '45.210',
    variation: '+5,4%',
    trend: 'positive',
    icon: 'users',
  },
  {
    id: 'desligamentos',
    title: 'Desligamentos',
    value: '38.100',
    variation: '-1,2%',
    trend: 'positive',
    icon: 'trending-down',
  },
  {
    id: 'saldo-caged',
    title: 'Saldo de Empregos (CAGED)',
    value: '+7.110',
    variation: '+12,3%',
    trend: 'positive',
    icon: 'users',
  },
  {
    id: 'taxa-formalidade',
    title: 'Taxa de Formalidade',
    value: '65,2%',
    variation: '+0,8%',
    trend: 'positive',
    icon: 'building-2',
  },
]