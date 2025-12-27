"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRightLeft,
  Copy,
  Folder,
  LogIn,
  LogOut,
  Trash2,
  Upload,
  FileText,
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
  if (action.startsWith("media.upload")) return <Upload className="h-4 w-4" />
  if (action.startsWith("media.delete")) return <Trash2 className="h-4 w-4" />
  if (action.startsWith("media.copy")) return <Copy className="h-4 w-4" />
  if (action.startsWith("media.move"))
    return <ArrowRightLeft className="h-4 w-4" />
  if (action.startsWith("folder.")) return <Folder className="h-4 w-4" />
  if (action.startsWith("auth.login")) return <LogIn className="h-4 w-4" />
  if (action.startsWith("auth.logout")) return <LogOut className="h-4 w-4" />
  return <FileText className="h-4 w-4" />
}

const getActionColor = (action: string) => {
  if (action.startsWith("media.upload"))
    return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  if (action.startsWith("media.delete"))
    return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  if (action.startsWith("media.copy"))
    return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  if (action.startsWith("media.move"))
    return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  if (action.startsWith("folder."))
    return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  if (action.startsWith("auth."))
    return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
  return "bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400"
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "Editor":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "Writer":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "Moderator":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

export default function UserActivity() {
  const [activities, setActivities] = useState<AuditLogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    const loadActivity = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/dashboard/activity?type=user&limit=8")
        if (!res.ok) throw new Error("Failed to load user activity")
        const payload = await res.json()
        if (active && payload?.data) {
          setActivities(payload.data as AuditLogItem[])
        }
      } catch (error) {
        console.error("Failed to load user activity:", error)
        if (active) {
          setActivities([])
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }
    loadActivity()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">User Activity</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      <div className="space-y-3">
        {activities.length === 0 && !isLoading ? (
          <div className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            No user activity yet.
          </div>
        ) : (
          activities.map((activity) => {
            const statusKey = getStatusKey(activity.status)
            const label = formatActionLabel(activity.action)
            const target = formatTarget(activity)
            const details = formatDetails(activity)
            const actorName = activity.actor?.name ?? "System"
            const actorRole = activity.actor?.role ?? "User"
            const avatar =
              activity.actor?.profilePicture &&
              activity.actor.profilePicture.trim().length > 0
                ? activity.actor.profilePicture
                : "/placeholder.svg"

            return (
              <div
                key={activity.id}
                className="flex items-center space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${getActionColor(
                    activity.action
                  )} flex-shrink-0`}
                >
                  {getActionIcon(activity.action)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={avatar} alt={actorName} />
                        <AvatarFallback className="text-xs">
                          {actorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        {actorName}
                      </span>
                      <Badge
                        className={`${getRoleBadgeColor(
                          actorRole
                        )} border-0 text-xs`}
                      >
                        {actorRole}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatTimestamp(activity.createdAt)}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{label}</span> {target}
                    {details && <span className="text-xs"> • {details}</span>}
                    {statusKey !== "success" && (
                      <span className="text-xs"> • {statusKey}</span>
                    )}
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
            Showing latest activity
          </span>
          <button className="text-primary hover:underline">User management</button>
        </div>
      </div>
    </div>
  )
}
