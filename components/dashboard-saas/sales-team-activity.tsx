"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Phone, Mail } from "lucide-react"

export function SalesTeamActivity() {
  const activities = [
    {
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Closed deal with TechCorp",
      value: "$15,000",
      time: "5 min ago",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      user: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Called prospect",
      value: "Follow-up scheduled",
      time: "12 min ago",
      icon: Phone,
      color: "text-blue-600",
    },
    {
      user: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Sent proposal",
      value: "$8,500 potential",
      time: "25 min ago",
      icon: Mail,
      color: "text-purple-600",
    },
    {
      user: "David Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Updated lead status",
      value: "Hot prospect",
      time: "1 hour ago",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      user: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "Scheduled demo",
      value: "Tomorrow 2 PM",
      time: "2 hours ago",
      icon: Phone,
      color: "text-indigo-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Sales Team Activity
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Recent actions by your sales team
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 rounded-lg p-3 hover:bg-muted/50"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {activity.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <activity.icon className={`mr-2 h-3 w-3 ${activity.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {activity.action}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {activity.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
          View Team Dashboard
        </button>
      </CardContent>
    </Card>
  )
}
