import { useEffect, useRef, useState } from 'react'
import { Bell, Check, Info, Search, TriangleAlert, X } from 'lucide-react'

import {
  createDashboardNotification,
  createFilterNotification,
  dashboardNotifications,
} from '../../data/mock/dashboard'
import type { DashboardNotification, NotificationTone } from '../../types/dashboard'

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterSummary: string
}

export function Header({ searchTerm, onSearchChange, filterSummary }: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(dashboardNotifications)
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([])
  const notificationSequence = useRef(0)
  const previousFilterSummary = useRef(filterSummary)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const newNotification = createDashboardNotification(
        notificationSequence.current,
        filterSummary,
      )
      notificationSequence.current += 1

      setNotifications((currentNotifications) => [
        newNotification,
        ...currentNotifications,
      ].slice(0, 10))
    }, 60_000)

    return () => window.clearInterval(intervalId)
  }, [filterSummary])

  useEffect(() => {
    if (previousFilterSummary.current === filterSummary) {
      return
    }

    const filterNotification = createFilterNotification(filterSummary)
    setNotifications((currentNotifications) => [
      filterNotification,
      ...currentNotifications,
    ].slice(0, 10))
    previousFilterSummary.current = filterSummary
  }, [filterSummary])

  const unreadCount = notifications.filter(
    (notification) => !readNotificationIds.includes(notification.id),
  ).length

  const markAsRead = (notificationId: string) => {
    setReadNotificationIds((currentIds) =>
      currentIds.includes(notificationId) ? currentIds : [...currentIds, notificationId],
    )
  }

  const markAllAsRead = () => {
    setReadNotificationIds(notifications.map((notification) => notification.id))
  }

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
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100 sm:min-w-72">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar indicadores e recortes"
              aria-label="Buscar indicadores e recortes"
              className="min-w-0 flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-white hover:text-slate-700"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((isOpen) => !isOpen)}
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-100 hover:text-brand-900"
                aria-label={`Notificações${unreadCount > 0 ? `, ${unreadCount} não lidas` : ''}`}
                aria-expanded={isNotificationsOpen}
                aria-haspopup="true"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-danger-600 px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <NotificationPanel
                  notifications={notifications}
                  readNotificationIds={readNotificationIds}
                  unreadCount={unreadCount}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

interface NotificationPanelProps {
  notifications: DashboardNotification[]
  readNotificationIds: string[]
  unreadCount: number
  onMarkAsRead: (notificationId: string) => void
  onMarkAllAsRead: () => void
}

const toneIconMap: Record<NotificationTone, typeof Info> = {
  info: Info,
  positive: Check,
  attention: TriangleAlert,
}

const toneClassMap: Record<NotificationTone, string> = {
  info: 'bg-brand-50 text-brand-700',
  positive: 'bg-success-50 text-success-600',
  attention: 'bg-amber-50 text-amber-700',
}

function NotificationPanel({
  notifications,
  readNotificationIds,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPanelProps) {
  return (
    <div className="absolute right-0 top-14 z-20 w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-panel">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-extrabold text-slate-900">Notificações</h3>
          <p className="mt-1 text-xs text-slate-500">
            {unreadCount > 0 ? `${unreadCount} não lidas` : 'Tudo lido'}
          </p>
        </div>
        <button
          type="button"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          className="text-xs font-semibold text-brand-700 transition hover:text-brand-900 disabled:cursor-not-allowed disabled:text-slate-300"
        >
          Marcar todas como lidas
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto p-2">
        {notifications.map((notification) => {
          const isRead = readNotificationIds.includes(notification.id)
          const Icon = toneIconMap[notification.tone]

          return (
            <button
              key={notification.id}
              type="button"
              onClick={() => onMarkAsRead(notification.id)}
              className="flex w-full gap-3 rounded-2xl p-3 text-left transition hover:bg-slate-50"
            >
              <span className={[ 'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', toneClassMap[notification.tone] ].join(' ')}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2">
                  <span className={[ 'text-sm font-bold', isRead ? 'text-slate-500' : 'text-slate-900' ].join(' ')}>
                    {notification.title}
                  </span>
                  {!isRead && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{notification.description}</span>
                <span className="mt-2 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {notification.time}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}