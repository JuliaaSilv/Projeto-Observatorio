import { useState } from 'react'
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  Lock,
  Shield,
  Target,
} from 'lucide-react'

import {
  metodologiaHero,
  odsList,
  dicionarioIndicadores,
  protocolosLgpd,
  parceirosInstitucionais,
} from '../../data/mock/metodologia'

export function MetodologiaPage() {
  const [selectedIndicador, setSelectedIndicador] = useState<string>(dicionarioIndicadores[0].sigla)

  const activeIndicador =
    dicionarioIndicadores.find((item) => item.sigla === selectedIndicador) ||
    dicionarioIndicadores[0]

  return (
    <div className="flex flex-col gap-6 lg:gap-7">
      {/* Banner Principal */}
      <section className="panel overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] xl:items-start">
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              Governança & Rigor Científico
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 lg:text-5xl">
              {metodologiaHero.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {metodologiaHero.description}
            </p>
          </div>

          <div className="panel-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Objetivo Estratégico
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Estabelecer uma cultura permanente de <strong>decisão baseada em evidências</strong> na gestão pública do Recife.
              </p>
              <p>
                Garantir transparência metodológica, rastreabilidade e integridade estatística com dados abertos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta Institucional */}
      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{metodologiaHero.note}</p>
        </div>
      </div>

      {/* Seção 1: Alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS) */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-700" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Alinhamento aos Objetivos de Desenvolvimento Sustentável (ODS)
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            O Observatório estrutura seus dados para subsidiar o cumprimento das metas da Agenda 2030 da ONU no território recifense.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {odsList.map((ods) => (
            <div
              key={ods.numero}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-slate-300"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-white shadow-md"
                    style={{ backgroundColor: ods.cor }}
                  >
                    {ods.numero}
                  </span>
                  <h3 className="font-extrabold text-slate-900 leading-tight">{ods.titulo}</h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{ods.descricao}</p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Metas Vinculadas no Recife
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {ods.metasVinculadas.map((meta, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: ods.cor }} />
                      <span>{meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 2: Protocolo de Governança e LGPD */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-700" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Privacidade, LGPD e Mitigação de Riscos
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Mecanismos rigorosos de proteção à privacidade individual em análises geográficas intramunicipais.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {protocolosLgpd.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">{item.pilar}</h4>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600">{item.descricao}</p>
              <div className="mt-4 rounded-xl bg-white border border-slate-200/80 p-3 text-xs text-brand-900 font-medium">
                <strong>Ação prática:</strong> {item.acaoPratica}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 rounded-2xl border border-brand-100 bg-brand-50/50 p-5">
          <div>
            <h4 className="font-bold text-sm text-brand-950">Mitigação de Riscos Técnicos e Compatibilização</h4>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Integração de fontes heterogêneas (registros administrativos vs. pesquisas amostrais) através de metodologia de harmonização cadastral com cruzamento de malhas cartográficas oficiais do Recife.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm text-brand-950">Sustentabilidade e Institucionalização</h4>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Parcerias interinstitucionais com universidades e convênios com o ecossistema do Porto Digital para manutenção técnica contínua e fomento à cultura de evidências na administração pública.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 3: Dicionário Metodológico de Indicadores */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-700" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Dicionário de Indicadores e Fórmulas de Cálculo
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Conceituação exata, fontes oficiais e equações matemáticas aplicadas nos indicadores do painel.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Seletor de Indicador */}
          <div className="flex flex-col gap-2">
            {dicionarioIndicadores.map((ind) => {
              const isSelected = ind.sigla === activeIndicador.sigla
              return (
                <button
                  key={ind.sigla}
                  type="button"
                  onClick={() => setSelectedIndicador(ind.sigla)}
                  className={[
                    'flex items-center justify-between rounded-2xl border p-4 text-left transition',
                    isSelected
                      ? 'border-brand-500 bg-brand-50/80 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50',
                  ].join(' ')}
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-700 block">
                      [{ind.sigla}]
                    </span>
                    <span className="font-bold text-sm text-slate-900">{ind.nome}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{ind.periodicidade}</span>
                </button>
              )
            })}
          </div>

          {/* Ficha Metodológica Detalhada */}
          <div className="panel border-brand-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-900">
                  Sigla: {activeIndicador.sigla}
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
                  {activeIndicador.nome}
                </h3>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Definição Operacional
                </span>
                <p className="text-sm leading-6 text-slate-700">{activeIndicador.definicao}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Fórmula de Cálculo
                </span>
                <div className="rounded-xl border border-slate-200 bg-slate-900 p-3.5 font-mono text-xs text-amber-300">
                  {activeIndicador.formula}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Fonte Principal
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-1 block">
                    {activeIndicador.fonte}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Desagregação Disponível
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-1 block">
                    {activeIndicador.desagregacao}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Periodicidade: {activeIndicador.periodicidade}</span>
              <span className="text-brand-700 font-semibold">Validado com comitê técnico</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Rede de Parcerias Acadêmicas e Institucionais */}
      <section className="panel p-5 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-brand-700" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Rede de Parcerias Acadêmicas e Institucionais
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Cooperação técnica com universidades, centros tecnológicos e agências governamentais para estudos contínuos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parceirosInstitucionais.map((parceiro, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                {parceiro.tipo}
              </span>
              <h4 className="mt-3 text-base font-extrabold text-slate-900">{parceiro.nome}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-600">{parceiro.papel}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
