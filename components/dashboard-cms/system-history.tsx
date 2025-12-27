"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Folder,
  Shield,
  Settings,
  User,
  Upload,
} from "lucide-react"
import {
  formatActionLabel,
  formatDetails,
  formatTarget,
  formatTimestamp,
  getStatusKey,
  type AuditLogItem,
} from "./activity-utils"

const getActionIcon = (action: string) => {
  if (action.startsWith("bucket.")) return <Database className="h-4 w-4" />
  if (action.startsWith("folder.")) return <Folder className="h-4 w-4" />
  if (action.startsWith("role.") || action.startsWith("permission."))
    return <Shield className="h-4 w-4" />
  if (action.startsWith("user.")) return <User className="h-4 w-4" />
  if (action.startsWith("media.")) return <Upload className="h-4 w-4" />
  return <Settings className="h-4 w-4" />
}

const getActionColor = (action: string) => {
  if (action.startsWith("bucket."))
    return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  if (action.startsWith("folder."))
    return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  if (action.startsWith("role.") || action.startsWith("permission."))
    return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  if (action.startsWith("user."))
    return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  if (action.startsWith("media."))
    return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
  return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
}

const getStatusColor = (statusKey: string) => {
  switch (statusKey) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

export default function SystemHistory() {
  const [events, setEvents] = useState<AuditLogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    const loadEvents = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/dashboard/activity?type=system&limit=8")
        if (!res.ok) throw new Error("Failed to load system history")
        const payload = await res.json()
        if (active && payload?.data) {
          setEvents(payload.data as AuditLogItem[])
        }
      } catch (error) {
        console.error("Failed to load system history:", error)
        if (active) {
          setEvents([])
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }
    loadEvents()
    return () => {
      active = false
    }
  }, [])

  const lastCheck =
    events.length > 0 ? formatTimestamp(events[0].createdAt) : "No activity yet"

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">System History</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      <div className="space-y-3">
        {events.length === 0 && !isLoading ? (
          <div className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            No system activity yet.
          </div>
        ) : (
          events.map((event) => {
            const statusKey = getStatusKey(event.status)
            const label = formatActionLabel(event.action)
            const target = formatTarget(event)
            const details = formatDetails(event)
            const actorName = event.actor?.name ?? "System"

            return (
              <div
                key={event.id}
                className="flex items-center space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${getActionColor(
                    event.action
                  )} flex-shrink-0`}
                >
                  {getActionIcon(event.action)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {label}
                      </span>
                      <Badge
                        className={`${getStatusColor(
                          statusKey
                        )} border-0 text-xs`}
                      >
                        {statusKey}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatTimestamp(event.createdAt)}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{target}</span> by {actorName}
                    {details && <span className="text-xs"> • {details}</span>}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Last system check: {lastCheck}
          </span>
          <button className="text-primary hover:underline">System logs</button>
        </div>
      </div>
    </div>
  )
}
