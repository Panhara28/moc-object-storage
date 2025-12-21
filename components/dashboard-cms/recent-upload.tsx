"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Upload } from "lucide-react"
import {
  formatActionLabel,
  formatDetails,
  formatTarget,
  formatTimestamp,
  getStatusKey,
  type AuditLogItem,
} from "./activity-utils"

const getActionIcon = (action: string) => {
  if (action === "folder.create") return <FolderPlus className="h-4 w-4" />
  return <Upload className="h-4 w-4" />
}

const getActionColor = (action: string) => {
  if (action === "folder.create") {
    return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  }
  return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
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

export default function RecentUpload() {
  const [items, setItems] = useState<AuditLogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    const loadRecent = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/dashboard/recent-uploads?limit=15")
        if (!res.ok) throw new Error("Failed to load recent uploads")
        const payload = await res.json()
        if (active && payload?.data) {
          setItems(payload.data as AuditLogItem[])
        }
      } catch (error) {
        console.error("Failed to load recent uploads:", error)
        if (active) {
          setItems([])
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }
    loadRecent()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Uploads
        </h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {items.length === 0 && !isLoading ? (
          <div className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            No uploads yet.
          </div>
        ) : (
          items.map((item) => {
            const statusKey = getStatusKey(item.status)
            const label = formatActionLabel(item.action)
            const target = formatTarget(item)
            const details = formatDetails(item)

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-full ${getActionColor(
                      item.action
                    )} flex-shrink-0`}
                  >
                    {getActionIcon(item.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {label}
                      </h4>
                      <Badge
                        className={`${getStatusColor(
                          statusKey
                        )} border-0 text-xs`}
                      >
                        {statusKey}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">{target}</span>
                      {details && <span className="text-xs"> • {details}</span>}
                    </div>
                  </div>
                </div>

                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimestamp(item.createdAt)}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
