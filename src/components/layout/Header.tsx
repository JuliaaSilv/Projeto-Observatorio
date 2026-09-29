import { Bell, CalendarRange, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="panel sticky top-4 z-10 px-5 py-4 lg:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
            Painel inicial
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">Visão geral do observatório</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 sm:min-w-72">
            <Search className="h-4 w-4 text-slate-400" />
            <span>Busca futura por indicadores e recortes</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-900">
              <CalendarRange className="h-4 w-4" />
              Base demonstrativa
            </span>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-100 hover:text-brand-900"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}