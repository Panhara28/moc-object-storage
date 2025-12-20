"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package } from "lucide-react"

export function TopProducts() {
  const products = [
    {
      name: "Wireless Headphones",
      sku: "WH-001",
      sales: 234,
      revenue: "$23,400",
      trend: "+15%",
    },
    {
      name: "Smart Watch",
      sku: "SW-002",
      sales: 189,
      revenue: "$18,900",
      trend: "+8%",
    },
    {
      name: "Bluetooth Speaker",
      sku: "BS-003",
      sales: 156,
      revenue: "$15,600",
      trend: "+12%",
    },
    {
      name: "Phone Case",
      sku: "PC-004",
      sales: 145,
      revenue: "$2,900",
      trend: "+5%",
    },
    {
      name: "USB Cable",
      sku: "UC-005",
      sales: 134,
      revenue: "$1,340",
      trend: "+3%",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Top Products
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Best selling products this month
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">
                    {product.name}
                  </span>
                  <span className="font-semibold text-foreground">
                    {product.revenue}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{product.sku}</span>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>{product.trend}</span>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {product.sales} sales
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
          View All Products
        </button>
      </CardContent>
    </Card>
  )
}
