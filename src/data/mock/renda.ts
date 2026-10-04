import type { DashboardHero, Metric } from '../../types/dashboard'

export const rendaHero: DashboardHero = {
  title: 'Distribuição de Renda e Desigualdades no Recife',
  description:
    'Acompanhe a massa de rendimento, disparidades entre trabalho formal e informal, hiato de gênero e distribuição por faixas salariais nos territórios.',
  note:
    'Indicadores deflacionados a preços constantes com base no IPCA metropolitano e estimativas harmonizadas da PNAD Contínua e RAIS.',
}

export const rendaMetrics: Metric[] = [
  {
    id: 'renda-media-trabalho',
    title: 'Rendimento Médio Habitual',
    value: 'R$ 2.478',
    variation: '+4,8%',
    trend: 'positive',
    icon: 'badge-cent',
  },
  {
    id: 'hiato-genero',
    title: 'Desigualdade de Gênero',
    value: '22,4%',
    variation: 'Homens R$ 2.760 / Mulheres R$ 2.254',
    trend: 'negative',
    icon: 'users',
  },
  {
    id: 'renda-informal',
    title: 'Renda do Trabalho Informal',
    value: 'R$ 1.290',
    variation: '-48% vs trabalho formal',
    trend: 'negative',
    icon: 'trending-down',
  },
  {
    id: 'indice-gini',
    title: 'Coeficiente de Gini (Desigualdade)',
    value: '0,584',
    variation: '-0,014 pt no ano',
    trend: 'positive',
    icon: 'building-2',
  },
]

export interface RendaFaixaData {
  faixa: string
  percentual: number
  populacao: number
}

export const distribuicaoFaixasRenda: RendaFaixaData[] = [
  { faixa: 'Até 1 Salário Mínimo', percentual: 36.4, populacao: 453400 },
  { faixa: 'De 1 a 2 Salários Mínimos', percentual: 32.1, populacao: 399800 },
  { faixa: 'De 2 a 5 Salários Mínimos', percentual: 19.8, populacao: 246600 },
  { faixa: 'Mais de 5 Salários Mínimos', percentual: 11.7, populacao: 145800 },
]

export interface RendaEvolucaoPoint {
  ano: string
  formal: number
  informal: number
  mediaGeral: number
}

export const evolucaoRendaHistorica: RendaEvolucaoPoint[] = [
  { ano: '2022', formal: 2410, informal: 1120, mediaGeral: 2180 },
  { ano: '2023', formal: 2540, informal: 1180, mediaGeral: 2310 },
  { ano: '2024', formal: 2710, informal: 1240, mediaGeral: 2478 },
  { ano: '2025', formal: 2890, informal: 1290, mediaGeral: 2632 },
  { ano: '2026', formal: 3040, informal: 1360, mediaGeral: 2796 },
]

export interface RendaGeneroSetor {
  setor: string
  homens: number
  mulheres: number
  diferenca: number
}

export const rendaGeneroPorSetor: RendaGeneroSetor[] = [
  { setor: 'Tecnologia / TI', homens: 4850, mulheres: 4120, diferenca: 17.7 },
  { setor: 'Serviços Especializados', homens: 3640, mulheres: 2980, diferenca: 22.1 },
  { setor: 'Indústria da Transformação', homens: 2780, mulheres: 2190, diferenca: 26.9 },
  { setor: 'Comércio Varejista', homens: 2140, mulheres: 1820, diferenca: 17.5 },
  { setor: 'Serviços Gerais / Limpeza', homens: 1790, mulheres: 1540, diferenca: 16.2 },
  { setor: 'Construção Civil', homens: 2320, mulheres: 1950, diferenca: 18.9 },
]

export interface RendaRpaComparison {
  rpa: string
  nome: string
  rendaMedia: number
  taxaVulnerabilidade: number
}

export const rendaPorRpaComparativo: RendaRpaComparison[] = [
  { rpa: 'RPA 6', nome: 'Sul (Boa Viagem / Ibura)', rendaMedia: 3760, taxaVulnerabilidade: 28.5 },
  { rpa: 'RPA 3', nome: 'Noroeste (Casa Forte / C. Amarela)', rendaMedia: 3450, taxaVulnerabilidade: 32.1 },
  { rpa: 'RPA 1', nome: 'Centro (Recife Antigo / S. Amaro)', rendaMedia: 2980, taxaVulnerabilidade: 38.4 },
  { rpa: 'RPA 4', nome: 'Oeste (Várzea / Cordeiro)', rendaMedia: 2620, taxaVulnerabilidade: 42.0 },
  { rpa: 'RPA 2', nome: 'Norte (Encruzilhada / Arruda)', rendaMedia: 2210, taxaVulnerabilidade: 47.6 },
  { rpa: 'RPA 5', nome: 'Sudoeste (Afogados / San Martin)', rendaMedia: 1940, taxaVulnerabilidade: 54.2 },
]
