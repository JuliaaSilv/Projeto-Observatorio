import { useState } from 'react'
import {
  AlertCircle,
  Coins,
  Scale,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { FilterPanel } from '../../components/dashboard/FilterPanel'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { dashboardFilters } from '../../data/mock/dashboard'
import {
  rendaHero,
  rendaMetrics,
  distribuicaoFaixasRenda,
  evolucaoRendaHistorica,
  rendaGeneroPorSetor,
  rendaPorRpaComparativo,
} from '../../data/mock/renda'
import type { FilterState } from '../../types/dashboard'

const initialFilterState = dashboardFilters.reduce<FilterState>((accumulator, filter) => {
  accumulator[filter.id] = filter.defaultValue
  return accumulator
}, {})

function EvolucaoTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string; value?: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  const labels: Record<string, string> = {
    formal: 'Trabalho Formal',
    informal: 'Trabalho Informal',
    mediaGeral: 'Média Municipal',
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        {payload.map((entry) => (
          <p key={entry.dataKey} className="flex items-center justify-between gap-5 text-slate-600">
            <span>{labels[entry.dataKey ?? ''] || entry.dataKey}</span>
            <strong className="text-slate-900">
              R$ {Number(entry.value ?? 0).toLocaleString('pt-BR')}
            </strong>
          </p>
        ))}
      </div>
    </div>
  )
}

function GeneroTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string; value?: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        {payload.map((entry) => (
          <p key={entry.dataKey} className="flex items-center justify-between gap-4 text-slate-600">
            <span>{entry.dataKey === 'homens' ? 'Homens' : 'Mulheres'}</span>
            <strong className="text-slate-900">
              R$ {Number(entry.value ?? 0).toLocaleString('pt-BR')}
            </strong>
          </p>
        ))}
      </div>
    </div>
  )
}

function FaixaTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number; payload?: { populacao?: number } }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const percent = payload[0]?.value
  const pop = payload[0]?.payload?.populacao

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        <p className="flex items-center justify-between gap-4 text-slate-600">
          <span>Proporção:</span>
          <strong className="text-brand-900">{percent}%</strong>
        </p>
        <p className="flex items-center justify-between gap-4 text-slate-600">
          <span>População ocupada:</span>
          <strong className="text-slate-900">{pop?.toLocaleString('pt-BR')} hab.</strong>
        </p>
      </div>
    </div>
  )
}

export function RendaPage() {
  const [filterValues, setFilterValues] = useState<FilterState>(initialFilterState)

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((currentValues) => ({
      ...currentValues,
      [filterId]: value,
    }))
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {/* Banner Principal */}
      <section className="panel overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Panorama de Renda & Desigualdades
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 lg:text-5xl">
              {rendaHero.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {rendaHero.description}
            </p>
          </div>

          <div className="panel-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Objetivo da Análise de Renda
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Identificar a severa assimetria entre o <strong>trabalho formal com carteira</strong> e a <strong>renda da economia informal</strong>.
              </p>
              <p>
                Mensurar o hiato de rendimentos entre homens e mulheres e a concentração de renda por território no Recife.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta Metodológico */}
      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{rendaHero.note}</p>
        </div>
      </div>

      {/* Filtros */}
      <FilterPanel
        filters={dashboardFilters}
        values={filterValues}
        onFilterChange={handleFilterChange}
        onResetFilters={() => setFilterValues(initialFilterState)}
      />

      {/* Cards de Métricas de Renda */}
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {rendaMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      {/* Gráfico 1: Evolução Histórica Formal vs Informal */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-brand-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Evolução da Renda Média: Trabalho Formal vs. Trabalho Informal
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Valores médios habituais (em R$) deflacionados a preços correntes de 2022 a 2026.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolucaoRendaHistorica} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="ano" tickLine={false} stroke="#64748b" fontSize={12} />
              <YAxis
                tickLine={false}
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(val: number) => `R$ ${val}`}
              />
              <Tooltip content={<EvolucaoTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '13px', color: '#475569' }} />
              <Line
                type="monotone"
                dataKey="formal"
                name="Trabalho Formal (CLT)"
                stroke="#124d99"
                strokeWidth={3}
                dot={{ r: 4, fill: '#124d99' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="mediaGeral"
                name="Média Geral do Município"
                stroke="#15803d"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: '#15803d' }}
              />
              <Line
                type="monotone"
                dataKey="informal"
                name="Trabalho Informal / Autônomo"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 4, fill: '#dc2626' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Gráficos em Duas Colunas: Faixas de Renda & Hiato de Gênero */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Distribuição por Faixas de Salário Mínimo */}
        <div className="panel p-5 lg:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Distribuição da População por Faixas de Salário
            </h3>
            <p className="text-xs text-slate-500">
              Percentual de trabalhadores ocupados por múltiplos do salário mínimo nacional.
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distribuicaoFaixasRenda}
                layout="vertical"
                margin={{ top: 10, right: 25, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" unit="%" stroke="#64748b" fontSize={11} domain={[0, 45]} />
                <YAxis
                  dataKey="faixa"
                  type="category"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  width={140}
                />
                <Tooltip content={<FaixaTooltip />} />
                <Bar
                  dataKey="percentual"
                  name="Proporção (%)"
                  fill="#16324f"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiato de Gênero por Setor Econômico */}
        <div className="panel p-5 lg:p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-700" />
              <h3 className="text-lg font-bold text-slate-900">
                Hiato Salarial de Gênero por Setor Produtivo
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Comparação do rendimento médio (em R$) de Homens vs. Mulheres por segmento econômico.
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rendaGeneroPorSetor}
                margin={{ top: 10, right: 10, left: -15, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="setor"
                  tickLine={false}
                  stroke="#64748b"
                  fontSize={10}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  tickLine={false}
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(val: number) => `R$ ${val}`}
                />
                <Tooltip content={<GeneroTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Bar dataKey="homens" name="Homens" fill="#1e40af" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mulheres" name="Mulheres" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Comparativo Territorial de Renda por RPA */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-brand-700" />
            <h3 className="text-lg font-bold text-slate-900">
              Disparidade de Rendimento Médio Domiciliar entre as RPAs do Recife
            </h3>
          </div>
          <p className="text-sm text-slate-500">
            Comparativo das 6 Regiões Político-Administrativas e o percentual de domicílios em alta vulnerabilidade.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Região Político-Administrativa</th>
                <th className="px-4 py-3">Pólos e Bairros de Referência</th>
                <th className="px-4 py-3 text-right">Renda Média Domiciliar</th>
                <th className="px-4 py-3 text-right">Taxa de Vulnerabilidade</th>
                <th className="px-4 py-3 text-center rounded-r-xl">Situação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rendaPorRpaComparativo.map((item) => (
                <tr key={item.rpa} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-bold text-slate-900">{item.rpa}</td>
                  <td className="px-4 py-3 text-slate-600">{item.nome}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-brand-900">
                    R$ {item.rendaMedia.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    <span
                      className={
                        item.taxaVulnerabilidade > 45
                          ? 'text-rose-600 font-bold'
                          : item.taxaVulnerabilidade > 35
                          ? 'text-amber-600 font-bold'
                          : 'text-emerald-700 font-bold'
                      }
                    >
                      {item.taxaVulnerabilidade}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={[
                        'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        item.taxaVulnerabilidade > 45
                          ? 'bg-rose-100 text-rose-800'
                          : item.taxaVulnerabilidade > 35
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800',
                      ].join(' ')}
                    >
                      {item.taxaVulnerabilidade > 45 ? 'Alerta Crítico' : item.taxaVulnerabilidade > 35 ? 'Moderada' : 'Baixa'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
