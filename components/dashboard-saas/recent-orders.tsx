"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export function RecentOrders() {
  const orders = [
    {
      id: "#ORD-001",
      customer: "John Smith",
      channel: "Website",
      amount: "$124.99",
      status: "completed",
      time: "2 min ago",
    },
    {
      id: "#ORD-002",
      customer: "Sarah Johnson",
      channel: "Amazon",
      amount: "$89.50",
      status: "processing",
      time: "5 min ago",
    },
    {
      id: "#ORD-003",
      customer: "Mike Chen",
      channel: "eBay",
      amount: "$234.00",
      status: "shipped",
      time: "12 min ago",
    },
    {
      id: "#ORD-004",
      customer: "Emma Wilson",
      channel: "Shopify",
      amount: "$67.25",
      status: "pending",
      time: "18 min ago",
    },
    {
      id: "#ORD-005",
      customer: "David Brown",
      channel: "Facebook",
      amount: "$156.80",
      status: "completed",
      time: "25 min ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Recent Orders
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest orders from all channels
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">
                    {order.id}
                  </span>
                  <span className="font-semibold text-foreground">
                    {order.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {order.customer}
                  </span>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{order.channel}</span>
                  <span>{order.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
          View All Orders
        </button>
      </CardContent>
    </Card>
  )
}
