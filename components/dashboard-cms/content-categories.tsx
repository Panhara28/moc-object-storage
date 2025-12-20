"use client"

import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, TrendingUp, TrendingDown } from "lucide-react"

interface Category {
  id: string
  name: string
  count: number
  change: number
  color: string
  description: string
}

const categories: Category[] = [
  {
    id: "1",
    name: "Technology",
    count: 156,
    change: 12.5,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    description: "Tech news & tutorials",
  },
  {
    id: "2",
    name: "Business",
    count: 142,
    change: 8.3,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    description: "Business insights",
  },
  {
    id: "3",
    name: "Health",
    count: 98,
    change: -2.1,
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    description: "Health & wellness",
  },
  {
    id: "4",
    name: "Sports",
    count: 87,
    change: 15.7,
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    description: "Sports coverage",
  },
  {
    id: "5",
    name: "Entertainment",
    count: 76,
    change: 5.2,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    description: "Entertainment news",
  },
  {
    id: "6",
    name: "Politics",
    count: 65,
    change: -8.4,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    description: "Political analysis",
  },
]

export default function ContentCategories() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Content Categories</h3>
        <button className="rounded-lg p-2 transition-colors hover:bg-muted/50">
          <Plus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Badge className={`${category.color} border-0 flex-shrink-0`}>{category.name}</Badge>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{category.count}</p>
                <div className="flex items-center justify-end">
                  {category.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${category.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {category.change > 0 ? "+" : ""}
                    {category.change}%
                  </span>
                </div>
              </div>

              
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Total Articles</span>
          <span className="font-medium text-foreground">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </div>
      </div>
    </div>
  )
}
