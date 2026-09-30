import {
  BookOpen,
  BriefcaseBusiness,
  Database,
  Home,
  Map,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

import type { NavIconName, NavigationItem } from '../../types/dashboard'

const iconMap: Record<NavIconName, LucideIcon> = {
  home: Home,
  briefcase: BriefcaseBusiness,
  wallet: Wallet,
  map: Map,
  database: Database,
  'book-open': BookOpen,
}

interface SidebarProps {
  items: NavigationItem[]
  onSelectPage?: (pageId: string) => void
}

export function Sidebar({ items, onSelectPage }: SidebarProps) {
  return (
    <aside className="panel relative overflow-hidden px-4 py-5 lg:min-h-[calc(100vh-2rem)] lg:w-80 lg:px-5 lg:py-6">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-brand-900 via-brand-700 to-brand-500 opacity-95" />

      <div className="relative flex flex-col gap-6">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur lg:p-5">
          <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
            Recife
          </span>
          <h1 className="mt-4 text-xl font-extrabold leading-tight lg:text-2xl">
            Observatório de Emprego e Renda do Recife
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-100/85">
            Dashboard acadêmico focado em componentização, reutilização e modularidade.
          </p>
        </div>

        <nav aria-label="Navegação principal">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {items.map((item) => {
              const Icon = iconMap[item.icon]

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    disabled={!item.isAvailable}
                    onClick={() => item.isAvailable && onSelectPage?.(item.id)}
                    className={[
                      'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition',
                      item.isActive
                        ? 'border-brand-200 bg-brand-50 text-brand-900 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-100 hover:bg-slate-50',
                      !item.isAvailable && 'opacity-60 cursor-not-allowed',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    <span
                      className={[
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        item.isActive ? 'bg-brand-900 text-white' : 'bg-slate-100 text-slate-500',
                      ].join(' ')}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-semibold">{item.label}</span>
                      <span className="text-xs text-slate-400">
                        {item.isAvailable ? 'Disponível' : 'Em breve'}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}