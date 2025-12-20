"use client"

import type React from "react"

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: React.ReactNode
}

const stats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "increase",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180.1%",
    changeType: "increase",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Customers",
    value: "12,234",
    change: "+19%",
    changeType: "increase",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Products",
    value: "573",
    change: "-4.3%",
    changeType: "decrease",
    icon: <Package className="h-4 w-4" />,
  },
]

export default function OverviewStats() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-lg border border-border bg-card p-3 text-card-foreground transition-shadow hover:shadow-md sm:rounded-xl sm:p-6"
        >
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
              {stat.title}
            </h3>
            <div className="flex-shrink-0 text-muted-foreground">
              {stat.icon}
            </div>
          </div>
          <div className="space-y-1">
            <div className="truncate text-lg font-bold text-foreground sm:text-2xl">
              {stat.value}
            </div>
            <div className="flex items-center text-xs">
              {stat.changeType === "increase" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1 flex-shrink-0" />
              )}
              <span className={`font-medium ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
              <span className="ml-1 hidden text-muted-foreground sm:inline">
                from last month
              </span>
              <span className="ml-1 text-muted-foreground sm:hidden">vs last</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
