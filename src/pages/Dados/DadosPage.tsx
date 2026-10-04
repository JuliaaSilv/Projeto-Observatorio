import { useState, useMemo } from 'react'
import {
  AlertCircle,
  Code2,
  Database,
  Download,
  FileText,
  Search,
  ShieldCheck,
  Table,
} from 'lucide-react'

import { MetricCard } from '../../components/dashboard/MetricCard'
import {
  dadosHero,
  dadosMetrics,
  datasetsCatalog,
  previewTableData,
  boletinsAnaliticos,
  type DatasetItem,
} from '../../data/mock/dados'

export function DadosPage() {
  const [activeTab, setActiveTab] = useState<'catalogo' | 'tabela' | 'boletins' | 'api'>('catalogo')
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todas')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [previewSearch, setPreviewSearch] = useState<string>('')

  const filteredDatasets = useMemo(() => {
    return datasetsCatalog.filter((item) => {
      const matchCat = selectedCategoria === 'todas' || item.categoria === selectedCategoria
      const matchSearch =
        searchQuery.trim() === '' ||
        item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.orgaoFonte.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCategoria, searchQuery])

  const filteredPreview = useMemo(() => {
    return previewTableData.filter((row) => {
      return (
        previewSearch.trim() === '' ||
        row.bairro.toLowerCase().includes(previewSearch.toLowerCase()) ||
        row.rpa.toLowerCase().includes(previewSearch.toLowerCase())
      )
    })
  }, [previewSearch])

  const handleDownloadDataset = (dataset: DatasetItem, formato: string) => {
    let content = ''
    let mimeType = 'text/plain'
    let ext = 'txt'

    if (formato === 'CSV') {
      content = `ID,Periodo,Bairro,RPA,Admissoes,Desligamentos,Saldo,TaxaInformalidade,RendaMedia\n` +
        previewTableData.map(r => `${r.id},${r.periodo},"${r.bairro}","${r.rpa}",${r.admissoes},${r.desligamentos},${r.saldo},${r.taxaInformalidade},"${r.rendaMedia}"`).join('\n')
      mimeType = 'text/csv;charset=utf-8;'
      ext = 'csv'
    } else if (formato === 'JSON') {
      content = JSON.stringify({ dataset: dataset.titulo, fonte: dataset.orgaoFonte, dados: previewTableData }, null, 2)
      mimeType = 'application/json'
      ext = 'json'
    } else {
      content = `Dados de exportação para ${dataset.titulo} (${formato})\nFonte: ${dataset.orgaoFonte}\nRegistros: ${dataset.totalLinhas}`
      mimeType = 'text/plain;charset=utf-8;'
      ext = 'txt'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${dataset.id}-${Date.now()}.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDownloadBoletim = (titulo: string, arquivo: string) => {
    const content = `PREFEITURA DO RECIFE - OBSERVATÓRIO DE EMPREGO E RENDA\n\n${titulo.toUpperCase()}\nArquivo demonstrativo: ${arquivo}\nData de Emissão: ${new Date().toLocaleDateString('pt-BR')}\n\nEste boletim apresenta as evidências empíricas sobre o mercado de trabalho do Recife, desagregado por bairros, gênero e faixas etárias.`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = arquivo.replace('.pdf', '.txt')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {/* Banner Principal */}
      <section className="panel overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Dados Abertos & Pesquisa
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 lg:text-5xl">
              {dadosHero.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {dadosHero.description}
            </p>
          </div>

          <div className="panel-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Integração das Fontes
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Bases de <strong>CAGED</strong>, <strong>RAIS</strong>, <strong>PNAD Contínua</strong> e registros cadastrais da Prefeitura do Recife.
              </p>
              <p>
                Padronização com formatos abertos, documentação de dicionário de dados e conformidade total com a LGPD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta de Transparência e LGPD */}
      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{dadosHero.note}</p>
        </div>
      </div>

      {/* Cards de Métricas de Dados */}
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {dadosMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      {/* Navegação por Abas da Seção de Dados */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('catalogo')}
          className={[
            'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition',
            activeTab === 'catalogo'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-slate-50',
          ].join(' ')}
        >
          <Database className="h-4 w-4" />
          Catálogo de Datasets
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tabela')}
          className={[
            'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition',
            activeTab === 'tabela'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-slate-50',
          ].join(' ')}
        >
          <Table className="h-4 w-4" />
          Pré-visualização Tabular
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('boletins')}
          className={[
            'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition',
            activeTab === 'boletins'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-slate-50',
          ].join(' ')}
        >
          <FileText className="h-4 w-4" />
          Boletins e Relatórios Periódicos
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('api')}
          className={[
            'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition',
            activeTab === 'api'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-slate-50',
          ].join(' ')}
        >
          <Code2 className="h-4 w-4" />
          API para Desenvolvedores
        </button>
      </div>

      {/* ABA 1: CATÁLOGO DE DATASETS */}
      {activeTab === 'catalogo' && (
        <section className="flex flex-col gap-5">
          {/* Barra de Filtros do Catálogo */}
          <div className="panel p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar base de dados, órgão de origem ou descrição..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCategoria}
                  onChange={(e) => setSelectedCategoria(e.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >
                  <option value="todas">Todas as categorias</option>
                  <option value="Emprego Formal">Emprego Formal</option>
                  <option value="Renda e Desigualdade">Renda e Desigualdade</option>
                  <option value="Territórios e Demografia">Territórios e Demografia</option>
                  <option value="Empresas e Negócios">Empresas e Negócios</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de Datasets */}
          <div className="grid gap-4">
            {filteredDatasets.map((dataset) => (
              <article
                key={dataset.id}
                className="panel p-5 lg:p-6 transition hover:border-brand-300"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                        {dataset.categoria}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Periodicidade: {dataset.periodicidade}
                      </span>
                      <span className="text-xs text-slate-400">
                        Atualizado em {dataset.ultimaAtualizacao}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900">{dataset.titulo}</h3>
                    <p className="text-sm leading-6 text-slate-600">{dataset.descricao}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span><strong>Fonte:</strong> {dataset.orgaoFonte}</span>
                      <span><strong>Cobertura:</strong> {dataset.cobertura}</span>
                      <span><strong>Tamanho:</strong> {dataset.tamanho} ({dataset.totalLinhas})</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-xs text-emerald-700">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>{dataset.conformidadeLgpd}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-col items-start gap-2 pt-2 lg:pt-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                      Download do Dataset
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dataset.formatos.map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => handleDownloadDataset(dataset, fmt)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-900 shadow-sm"
                        >
                          <Download className="h-3.5 w-3.5 text-brand-700" />
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filteredDatasets.length === 0 && (
              <div className="panel p-12 text-center text-slate-500">
                Nenhuma base de dados encontrada para os critérios selecionados.
              </div>
            )}
          </div>
        </section>
      )}

      {/* ABA 2: PRÉ-VISUALIZAÇÃO TABULAR */}
      {activeTab === 'tabela' && (
        <section className="panel p-5 lg:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
                Amostra de Microdados Tratados
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                Visualização do CAGED e Indicadores por Bairro
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filtrar tabela..."
                  value={previewSearch}
                  onChange={(e) => setPreviewSearch(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 pl-9 text-xs text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white"
                />
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              </div>

              <button
                type="button"
                onClick={() => handleDownloadDataset(datasetsCatalog[0], 'CSV')}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-700 shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                Baixar Amostra (CSV)
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Competência</th>
                  <th className="px-4 py-3">Bairro</th>
                  <th className="px-4 py-3">RPA</th>
                  <th className="px-4 py-3 text-right">Admissões</th>
                  <th className="px-4 py-3 text-right">Desligamentos</th>
                  <th className="px-4 py-3 text-right">Saldo Líquido</th>
                  <th className="px-4 py-3 text-right">Taxa Informalidade</th>
                  <th className="px-4 py-3 text-right rounded-r-xl">Renda Média</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPreview.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.periodo}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{row.bairro}</td>
                    <td className="px-4 py-3 text-slate-500">{row.rpa}</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-semibold">
                      +{row.admissoes.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      -{row.desligamentos.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold">
                      <span
                        className={
                          row.saldo >= 0
                            ? 'text-emerald-700 font-bold'
                            : 'text-rose-600 font-bold'
                        }
                      >
                        {row.saldo >= 0 ? `+${row.saldo}` : row.saldo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-amber-700 font-medium">
                      {row.taxaInformalidade}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">
                      {row.rendaMedia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ABA 3: BOLETINS E RELATÓRIOS ANALÍTICOS */}
      {activeTab === 'boletins' && (
        <section className="flex flex-col gap-4">
          <div className="panel p-5 lg:p-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              Boletins de Conjuntura & Estudos Aprofundados
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Publicações técnicas periódicas produzidas em cooperação com pesquisadores e universidades parceiras.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {boletinsAnaliticos.map((boletim) => (
              <div
                key={boletim.id}
                className="panel flex flex-col justify-between p-5 lg:p-6 transition hover:border-brand-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                      {boletim.tipo}
                    </span>
                    <span className="text-xs text-slate-400">{boletim.dataPublicacao}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold leading-snug text-slate-950">
                    {boletim.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{boletim.resumo}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400">{boletim.paginas} páginas · PDF</span>
                  <button
                    type="button"
                    onClick={() => handleDownloadBoletim(boletim.titulo, boletim.arquivo)}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3.5 py-2 text-xs font-bold text-brand-900 transition hover:bg-brand-100"
                  >
                    <Download className="h-4 w-4" />
                    Baixar Relatório
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ABA 4: API PARA DESENVOLVEDORES */}
      {activeTab === 'api' && (
        <section className="panel p-5 lg:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Integração de Sistemas
            </p>
            <h2 className="text-xl font-extrabold text-slate-900">
              Endpoints Públicos da API do Observatório (REST)
            </h2>
            <p className="text-sm text-slate-600">
              Consuma os indicadores e dados territoriais diretamente em suas aplicações, painéis de BI ou modelos estatísticos em R/Python.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-100">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-xs text-slate-400">
                <span className="font-mono">GET /api/v1/recife/territorios</span>
                <span>Resposta: application/json</span>
              </div>
              <pre className="mt-3 overflow-x-auto text-xs font-mono text-emerald-400">
{`# Requisição via cURL:
curl -X GET "https://observatorio.recife.pe.gov.br/api/v1/recife/territorios?rpa=RPA6" \\
     -H "Accept: application/json"`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-100">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-xs text-slate-400">
                <span className="font-mono">Python (pandas / requests)</span>
                <span>Exemplo de ingestão</span>
              </div>
              <pre className="mt-3 overflow-x-auto text-xs font-mono text-cyan-300">
{`import requests
import pandas as pd

url = "https://observatorio.recife.pe.gov.br/api/v1/recife/caged/mensal"
response = requests.get(url, params={"periodo": "2025-06"})
df = pd.DataFrame(response.json()["dados"])
print(df.head())`}
              </pre>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <h4 className="font-bold text-sm text-slate-900">Limite de Taxa</h4>
                <p className="text-xs text-slate-500 mt-1">Até 120 requisições por minuto sem autenticação prévia.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <h4 className="font-bold text-sm text-slate-900">Formato Padrão</h4>
                <p className="text-xs text-slate-500 mt-1">JSON UTF-8 com paginação cursor-based e metadados.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <h4 className="font-bold text-sm text-slate-900">SLA de Atualização</h4>
                <p className="text-xs text-slate-500 mt-1">Dados sincronizados mensalmente com os repositórios oficiais.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
