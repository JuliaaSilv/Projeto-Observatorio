import { useState, useMemo } from 'react'
import {
  AlertCircle,
  Download,
  MapPin,
  Search,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

import { MetricCard } from '../../components/dashboard/MetricCard'
import {
  territoriosHero,
  territoriosMetrics,
  bairrosData,
  rpaList,
  rankingDesempregoJovem,
} from '../../data/mock/territorios'

function RankingTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-600">Desemprego Jovem:</span>
        <strong className="text-rose-600 font-extrabold">{value}%</strong>
      </div>
      <p className="mt-1 text-[11px] text-slate-400">Faixa de 18 a 24 anos</p>
    </div>
  )
}

export function TerritoriosPage() {
  const [selectedRpa, setSelectedRpa] = useState<string>('todas')
  const [selectedVulnerabilidade, setSelectedVulnerabilidade] = useState<string>('todas')
  const [searchBairro, setSearchBairro] = useState<string>('')
  const [selectedBairroId, setSelectedBairroId] = useState<string>('ibura')

  const filteredBairros = useMemo(() => {
    return bairrosData.filter((b) => {
      const matchRpa = selectedRpa === 'todas' || b.rpa === selectedRpa
      const matchVuln =
        selectedVulnerabilidade === 'todas' || b.vulnerabilidade === selectedVulnerabilidade
      const matchSearch =
        searchBairro.trim() === '' ||
        b.nome.toLowerCase().includes(searchBairro.toLowerCase()) ||
        b.rpaNome.toLowerCase().includes(searchBairro.toLowerCase())
      return matchRpa && matchVuln && matchSearch
    })
  }, [selectedRpa, selectedVulnerabilidade, searchBairro])

  const selectedBairro = useMemo(() => {
    return bairrosData.find((b) => b.id === selectedBairroId) || bairrosData[0]
  }, [selectedBairroId])

  const handleDownloadCsv = () => {
    const headers = [
      'Bairro',
      'RPA',
      'Populacao',
      'TaxaDesempregoGeral',
      'DesempregoJovem18_24',
      'TaxaInformalidade',
      'RendaMedia',
      'PostosFormais',
      'SetorPredominante',
      'Vulnerabilidade',
    ]
    const rows = filteredBairros.map((b) => [
      `"${b.nome}"`,
      `"${b.rpa} - ${b.rpaNome}"`,
      b.populacao,
      `${b.taxaDesemprego}%`,
      `${b.desempregoJovem}%`,
      `${b.taxaInformalidade}%`,
      `"R$ ${b.rendaMedia}"`,
      b.postosFormais,
      `"${b.setorPredominante}"`,
      `"${b.vulnerabilidade}"`,
    ])
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `territorios-recife-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {/* Banner Principal */}
      <section className="panel overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Recortes Territoriais & Bairros
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 lg:text-5xl">
              {territoriosHero.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {territoriosHero.description}
            </p>
          </div>

          <div className="panel-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Foco da Desagregação
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Identificação territorial de bolsões de <strong>desemprego jovem</strong> e alta <strong>informalidade</strong>.
              </p>
              <p>
                Subsídio para direcionamento de cursos profissionalizantes e incentivos tributários setoriais nos bairros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta Metodológico */}
      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{territoriosHero.note}</p>
        </div>
      </div>

      {/* Cards de Métricas Territoriais */}
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {territoriosMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      {/* Painel de Seleção e Filtros Territoriais */}
      <section className="panel p-5 lg:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Explorador Territorial
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Filtre e Analise Bairros por Região
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-900 shadow-sm"
              title="Baixar dados territoriais em CSV"
            >
              <Download className="h-4 w-4 text-brand-700" />
              Exportar CSV ({filteredBairros.length} bairros)
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {/* Busca por Bairro */}
          <div>
            <label htmlFor="search-bairro" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Buscar Bairro
            </label>
            <div className="relative">
              <input
                id="search-bairro"
                type="text"
                placeholder="Ex: Ibura, Boa Viagem..."
                value={searchBairro}
                onChange={(e) => setSearchBairro(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Filtro RPA */}
          <div>
            <label htmlFor="filter-rpa" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Região Político-Administrativa (RPA)
            </label>
            <select
              id="filter-rpa"
              value={selectedRpa}
              onChange={(e) => setSelectedRpa(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            >
              <option value="todas">Todas as RPAs (Recife)</option>
              {rpaList.map((rpa) => (
                <option key={rpa.rpa} value={rpa.rpa}>
                  {rpa.rpa} - {rpa.nome} ({rpa.populacaoTotal.toLocaleString('pt-BR')} hab.)
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Vulnerabilidade */}
          <div>
            <label htmlFor="filter-vuln" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Nível de Vulnerabilidade
            </label>
            <select
              id="filter-vuln"
              value={selectedVulnerabilidade}
              onChange={(e) => setSelectedVulnerabilidade(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            >
              <option value="todas">Todos os Níveis</option>
              <option value="Baixa">Baixa Vulnerabilidade</option>
              <option value="Média">Média Vulnerabilidade</option>
              <option value="Alta">Alta Vulnerabilidade</option>
              <option value="Muito Alta">Muito Alta Vulnerabilidade</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid Interativo: Bairro Selecionado + Detalhes */}
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Lista de Bairros Selecionáveis */}
        <div className="panel p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Bairros Monitorados</h3>
              <p className="text-xs text-slate-500">Clique em um bairro para abrir o diagnóstico detalhado</p>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              {filteredBairros.length} resultado{filteredBairros.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="grid max-h-[460px] grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1">
            {filteredBairros.map((b) => {
              const isSelected = b.id === selectedBairroId
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBairroId(b.id)}
                  className={[
                    'flex flex-col gap-2 rounded-2xl border p-4 text-left transition',
                    isSelected
                      ? 'border-brand-500 bg-brand-50/70 shadow-sm ring-2 ring-brand-500/20'
                      : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50/80',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{b.nome}</span>
                      <p className="text-xs text-slate-500">{b.rpa} · {b.rpaNome}</p>
                    </div>
                    <span
                      className={[
                        'rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                        b.vulnerabilidade === 'Muito Alta'
                          ? 'bg-rose-100 text-rose-800'
                          : b.vulnerabilidade === 'Alta'
                          ? 'bg-amber-100 text-amber-800'
                          : b.vulnerabilidade === 'Média'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800',
                      ].join(' ')}
                    >
                      {b.vulnerabilidade}
                    </span>
                  </div>

                  <div className="mt-1 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Desemp. Jovem</span>
                      <strong className={b.desempregoJovem > 22 ? 'text-danger-600' : 'text-slate-700'}>
                        {b.desempregoJovem}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Informalidade</span>
                      <strong className={b.taxaInformalidade > 40 ? 'text-amber-700' : 'text-slate-700'}>
                        {b.taxaInformalidade}%
                      </strong>
                    </div>
                  </div>
                </button>
              )
            })}
            {filteredBairros.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-slate-500">
                Nenhum bairro encontrado com os filtros selecionados.
              </div>
            )}
          </div>
        </div>

        {/* Detalhamento do Bairro Selecionado */}
        {selectedBairro && (
          <div className="panel border-brand-200 bg-gradient-to-b from-white to-brand-50/30 p-5 lg:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                    <MapPin className="h-3.5 w-3.5" />
                    {selectedBairro.rpa} · {selectedBairro.rpaNome}
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                    {selectedBairro.nome}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    População estimada: {selectedBairro.populacao.toLocaleString('pt-BR')} habitantes
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Renda Média</span>
                  <span className="text-xl font-extrabold text-brand-900">
                    R$ {selectedBairro.rendaMedia.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Indicadores do Bairro */}
              <div className="mt-6 space-y-4">
                {/* Desemprego Jovem */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">Taxa de Desemprego Jovem (18-24)</span>
                    <strong className="text-rose-600 font-extrabold text-base">
                      {selectedBairro.desempregoJovem}%
                    </strong>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rose-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, selectedBairro.desempregoJovem * 2.5)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    Média da cidade: 21,8% · {selectedBairro.desempregoJovem > 21.8 ? 'Acima' : 'Abaixo'} da média do Recife
                  </p>
                </div>

                {/* Taxa de Informalidade */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">Taxa de Informalidade</span>
                    <strong className="text-amber-600 font-extrabold text-base">
                      {selectedBairro.taxaInformalidade}%
                    </strong>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, selectedBairro.taxaInformalidade * 1.5)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    Trabalhadores por conta própria sem CNPJ e informais sem registro
                  </p>
                </div>

                {/* Postos Formais & Setor Predominante */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5">
                    <span className="text-xs text-slate-400 block font-semibold">Postos Formais</span>
                    <strong className="text-lg font-extrabold text-slate-900 mt-1 block">
                      {selectedBairro.postosFormais.toLocaleString('pt-BR')}
                    </strong>
                    <span className="text-[11px] text-slate-500">Com carteira assinada</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5">
                    <span className="text-xs text-slate-400 block font-semibold">Desemprego Geral</span>
                    <strong className="text-lg font-extrabold text-slate-900 mt-1 block">
                      {selectedBairro.taxaDesemprego}%
                    </strong>
                    <span className="text-[11px] text-slate-500">População ativa total</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
                  <span className="text-xs text-slate-400 block font-semibold">Eixo Econômico Dominante</span>
                  <p className="text-sm font-bold text-brand-900 mt-1">{selectedBairro.setorPredominante}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Fonte: Estimativas cruzadas CAGED / PNADC / Censo</span>
              <span className="font-semibold text-brand-700">Recife 2025</span>
            </div>
          </div>
        )}
      </section>

      {/* Gráfico Comparativo: Ranking de Desemprego Jovem por Bairro */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <h2 className="text-lg font-bold text-slate-900">
              Taxa de Desemprego Juvenil (18 a 24 anos) nos Bairros Selecionados
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Comparativo entre bairros de maior vulnerabilidade vs. áreas de alta renda, com a linha média municipal de 21,8%.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankingDesempregoJovem} margin={{ top: 15, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="bairro"
                tickLine={false}
                stroke="#64748b"
                fontSize={11}
                angle={-25}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tickLine={false}
                stroke="#64748b"
                fontSize={12}
                unit="%"
                domain={[0, 35]}
              />
              <Tooltip content={<RankingTooltip />} />
              <ReferenceLine
                y={21.8}
                stroke="#dc2626"
                strokeDasharray="4 4"
                label={{
                  value: 'Média Recife (21,8%)',
                  position: 'insideTopRight',
                  fill: '#dc2626',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <Bar
                dataKey="taxa"
                name="Taxa de Desemprego Jovem (%)"
                fill="#16324f"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tabela de Dados Territoriais */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tabela de Indicadores por Bairro</h3>
            <p className="text-xs text-slate-500">Dados consolidados para formulação de políticas públicas locais</p>
          </div>
          <span className="text-xs text-slate-500">Exibindo {filteredBairros.length} de {bairrosData.length} bairros</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Bairro</th>
                <th className="px-4 py-3">RPA</th>
                <th className="px-4 py-3 text-right">População</th>
                <th className="px-4 py-3 text-right">Desemp. Geral</th>
                <th className="px-4 py-3 text-right">Desemp. Jovem</th>
                <th className="px-4 py-3 text-right">Informalidade</th>
                <th className="px-4 py-3 text-right">Renda Média</th>
                <th className="px-4 py-3 rounded-r-xl">Vulnerabilidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBairros.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => setSelectedBairroId(b.id)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">{b.nome}</td>
                  <td className="px-4 py-3 text-slate-500">{b.rpa} ({b.rpaNome})</td>
                  <td className="px-4 py-3 text-right">{b.populacao.toLocaleString('pt-BR')}</td>
                  <td className="px-4 py-3 text-right font-medium">{b.taxaDesemprego}%</td>
                  <td className="px-4 py-3 text-right font-bold text-rose-600">{b.desempregoJovem}%</td>
                  <td className="px-4 py-3 text-right font-medium text-amber-600">{b.taxaInformalidade}%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    R$ {b.rendaMedia.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        'rounded-md px-2 py-0.5 text-[11px] font-semibold',
                        b.vulnerabilidade === 'Muito Alta'
                          ? 'bg-rose-100 text-rose-800'
                          : b.vulnerabilidade === 'Alta'
                          ? 'bg-amber-100 text-amber-800'
                          : b.vulnerabilidade === 'Média'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800',
                      ].join(' ')}
                    >
                      {b.vulnerabilidade}
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
